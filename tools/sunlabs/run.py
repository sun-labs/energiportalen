from api_energiportalen import *

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



lid_exists = location_exists(id = new_loc)
lname_exists = location_exists(name = location['name'])

print lid_exists
print lname_exists

print new_uk
print new_ud
print(new_loc, new_unit, bind_loc_unit)

print get_units()
print get_unit_keys(5)
print get_unit_keys()
print unit_exists(id = 6)
print unit_exists(id = -53)