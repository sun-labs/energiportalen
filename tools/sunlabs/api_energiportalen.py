import MySQLdb as mysql
import CONFIG as C

con = None
cur = None
try:
  con =  mysql.connect(**C.database)
  cur = c.cursor()
except mysql.OperationalError as err:
  print("Can't connect to database.")
  print("[RAW] {}".format(err))
  exit()

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

def unit_exists(unit_id):
  query = "SELECT * FROM units WHERE id = %s"
  cur.execute(query, [unit_id])
  return cur.fetchone() is not None

# print get_units()
# print get_unit_keys(5)
# print get_unit_keys()
# print unit_exists(6)
# print unit_exists(-53)