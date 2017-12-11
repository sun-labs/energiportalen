import mysql from 'mysql';
import { isEmail } from 'validator';
import * as t from '../tools';

import { con } from './Connection';

class User {

  construct({ id, email, password }) {
    this.id = id || -1;
    this.email = email || '';
    this.password = password || '';
    this.exists = false;
  }

  /*
  * CB: { this }
  */
  fetchData(cb) {
    const me = { email: this.email };
    User.getUser(me, (err, user) => {
      if(user) {
        this.password = user.password;
        this.email = user.email;
        this.id = user.id;
        this.exists = true;
      }
      cb(user);
    });
    
  }

  /*
  * CB: Int
  */
  static getUserCount(cb) {
    const query = `
      SELECT COUNT(id) as userCount FROM users;
    `;
    con.query({ 
      sql: query
    }, (err, results) => {
      cb(results[0].userCount);
    });
  }

  /**
  * CB: Boolean
  */
  static validEmail(email) {
    return isEmail(email);
  }

  /**
  * CB: { err, result }
  */
  static storeUser({ email, password }, cb) {

    if (!email || !password) {
      return cb({ error: 'no email or password' });
    }
    if(!User.validEmail(email)) {
      return cb({ error: 'not a valid email' });
    }

    const query = `
      INSERT into users (email, password) 
      VALUES (?, ?);
    `;
    const inserts = [email, password];
    const p_query = mysql.format(query, inserts);

    con.query({
      sql: p_query,
    }, (err, result) => {
      cb(err, result);
      // err.code; == 'ER_DUP_ENTRY'
    });

  }

  /*
  * PARAMS: { email, id }
  * NOTE: id is first priority, email second priority
  * PURPOSE: finds user from DB via email or by ID.
  * CB: err, { user }
  */
  static getUser({ email, id }, cb) {
    if(!email && !id) {
      return cb();
    }
    const key = (id) ? 'id' : 'email';
    const value = (id) ? id : email;
    const query = `
      SELECT *
      FROM users
      WHERE ${key} = ?
    `;
    const p_query = mysql.format(query, value);
    con.query({
      sql: p_query
    }, (err, results) => {
      if(!err && results.length > 0) {
        let user = results[0];
        user.password = user.password.toString();
        cb(err, user);
      } else {
        cb(err);
      }
    });
  }

  /**
   * @param {object} data
   * @param {number} data.id
   * @param {function} cb 
   * @callback {function} (err, res)
   * @returns {undefined}
   * 
   * @memberOf User
   */
  static getUserMetaData({ id }, cb) {
    if(!id) { return cb(); }
    const query = `
      SELECT md.*, mk.*
      FROM meta_data as md
      INNER JOIN (
        SELECT 
          meta_key_id, MAX(created_at) as created_at
        FROM 
          meta_data
        GROUP BY meta_key_id
      ) as mdg
      ON 
        md.meta_key_id = mdg.meta_key_id AND 
        md.created_at = mdg.created_at
      INNER JOIN meta_keys as mk
      ON mk.id = md.meta_key_id
      WHERE md.user_id = ?
    `
    const p_query = mysql.format(query, id);
    con.query({
      sql: p_query
    }, (err, results) => {
      if(results.length > 0) {
        let grouped = {};
        for(let res of results) {
          const key = t.toCamelCase(res.name);
          grouped[key] = {
            value: res.value,
            keyId: res.meta_key_id,
          }
        }
        cb(err, grouped)
      } else {
        cb(err);
      }
    });
  }

  
  /**
   * @static
   * @param {object} data
   * @param {number} data.id
   * @param {function} cb 
   * @callback {function} (err, res)
   * @returns {undefined}
   * 
   * @memberOf User
   */
  static getUserBlocks({ id }, cb) {

    if(id < 0) { return cb(new Error('invalid user id'))}

    const QUERY = `
      SELECT 
        child.id,
        child.unit_id,
        child.key_id,
        GREATEST(IFNULL(child.type_id, 0), IFNULL(parent.type_id, 0)) as b_type_id,
        (SELECT constant FROM block_types as bt WHERE bt.id = b_type_id) as block_type,
        GREATEST(IFNULL(child.user_id, 0), IFNULL(parent.user_id, 0)) as user_id,
        GREATEST(IFNULL(child.time_interval, 0), IFNULL(parent.time_interval, 0)) as time_interval,
        GREATEST(IFNULL(child.timespan, 0), IFNULL(parent.timespan, 0)) as timespan,
        GREATEST(IFNULL(child.dashboard_index, 0), IFNULL(parent.dashboard_index, 0)) as dashboard_index,
        child.date_from,
        child.date_to,
        child.is_removed
      FROM 
        user_blocks as child
      LEFT JOIN 
        user_blocks as parent
      ON 
        child.block_id = parent.id
      WHERE 
        child.user_id = ? OR 
        parent.user_id = ?;
    `;
    const VALUES = [id, id];
    const P_QUERY = mysql.format(QUERY, VALUES);

    con.query({
      sql: P_QUERY
    }, (err, res) => {
      cb(err, res);
    });

  }

  /**
   * 
   * Get companies that the user is a part of and manages(?)
   * 
   * @static
   * @param {number} {id} 
   * @param {function} cb 
   * @returns {undefined}
   * 
   * @memberOf User
   */
  static getUserCompanies({id}, cb) {

    if(id < 0) { return cb(new Error('invalid user id'))}

    const QUERY = `
      SELECT
        c.name,
        uc.is_admin
      FROM
        user_companies as uc
      INNER JOIN companies as c ON 
        uc.company_id = c.id
      INNER JOIN users as u ON 
        uc.user_id = u.id
      WHERE 
        u.id = ?
    `;

    const VALUES = [id];
    const P_QUERY = mysql.format(QUERY, VALUES);

    con.query({
      sql: P_QUERY
    }, (err, res) => {
      cb(err, res);
    });

  }

  /**
   * 
   * Get the current number of blocks for a certain user based on userId
   * 
   * @param {number} { id } 
   * @param {any} cb (err, count)
   * 
   * @memberOf User
   */
  static getBlockCountForUser({ id }, cb) {
    this.getUserBlocks({ id }, (err, res) => {
      blocks = res.filter((block) => {
        return block.is_removed === false;
      })
      cb(err, blocks.length)
    });
  }

  /**
   * Add a block to the database for a certain user
   * @static
   * @param {any} { id, block } 
   * @param {any} cb 
   * 
   * @memberOf User
   */
  static addBlockForUser({ id, block }, cb) {

  }
  
}

export default User;