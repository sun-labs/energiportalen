import MySQLdb as mysql
import CONFIG as C
import time
import datetime

con = None
cur = None
try:
  con =  mysql.connect(**C.database)
  cur = con.cursor()
except mysql.OperationalError as err:
  print("Can't connect to database.")
  print("[RAW] {}".format(err))
  exit()

def _query(query, params = None):
  try:
    if params is None:
      cur.execute(query)
    else:
      cur.execute(query, params)
    return cur
  except (mysql.Error, mysql.Warning) as e:
    print(e)
    return None

def _entity_exists(table, id = None, name = None):
  query = "SELECT * FROM {}".format(table)
  if id is not None:
    query += " WHERE id = %s"
    params = [id]
  elif name is not None:
    query += " WHERE name = %s"
    params = [name]
  else:
    return False
  cur = _query(query, params)
  return cur.fetchone() is not None

# get every unit 
def get_units():
  query = "SELECT * FROM units"
  cur.execute(query)
  return cur.fetchall()

# get every unit_key or filter by unit_id
def get_unit_keys(unit_id = None):
  query = "SELECT * FROM unit_keys as uk"
  if unit_id is not None:
    query += " WHERE unit_id = %s"
    cur.execute(query, [unit_id])
  else:
    cur.execute(query)
  return cur.fetchall()

def unit_exists(**kwargs):
  return _entity_exists('units', **kwargs)

def location_exists(**kwargs):
  return _entity_exists('locations', **kwargs)

def add_location(name = None, image = None, description = None, country = None, city = None):
  query = """
    INSERT INTO locations
      (name, image, description, country, city)
    VALUES
      (%s, %s, %s, %s, %s)
  """
  cur.execute(query, [name, image, description, country, city])
  return cur.lastrowid

def add_unit(name = None):
  query = """
    INSERT INTO units (name)
    VALUES (%s)
  """
  cur.execute(query, [name])
  return cur.lastrowid

def bind_unit_location(unit_id, location_id):
  query = """
    INSERT INTO unit_locations 
      (unit_id, location_id)
    VALUES
      (%s, %s)
  """
  cur = _query(query, [unit_id, location_id])
  return cur.lastrowid

def add_unit_key(unit_id = None, name = None, notes = None, si_unit_id = None):
  query = """
    INSERT INTO unit_keys
      (unit_id, name, notes, si_unit_id)
    VALUES
      (%s, %s, %s, %s)
  """
  cur = _query(query, [unit_id, name, notes, si_unit_id])
  return cur.lastrowid

def add_unit_data(unit_id = None, unit_key = None, value = None, timestamp = None):
  query = """
    INSERT INTO unit_data
      (unit_id, unit_key, value, timestamp)
    VALUES
      (%s, %s, %s, %s)
  """
  cur = _query(query, [unit_id, unit_key, value, timestamp])
  return cur.lastrowid
  

# def add_unit(unit_name = None, unit_location = None)

location = {
  'name': 'test',
  'image': None,
  'description': None,
  'country': 'SWE',
  'city': 'Uppsala',
}
unit = { 'name': 'SALAHEBY1' }
new_loc = add_location(**location)
new_unit = add_unit(**unit)
bind_loc_unit = bind_unit_location(new_unit, new_loc)
new_uk = add_unit_key(**{ 
    'name': 'TESTKEY',
    'unit_id': new_unit,
    'notes': 'testing',
    'si_unit_id': 14,
})


ts = time.time()
timestamp = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')
new_ud = add_unit_data(**{
  'unit_id': new_unit,
  'unit_key': new_uk,
  'value': 10.00102012,
  'timestamp': timestamp,
})

con.commit()

lid_exists = location_exists(id = new_loc)
lname_exists = location_exists(name = location['name'])

print lid_exists
print lname_exists

# print new_uk
# print new_ud
# print(new_loc, new_unit, bind_loc_unit)

# print get_units()
# print get_unit_keys(5)
# print get_unit_keys()
# print unit_exists(6)
# print unit_exists(-53)