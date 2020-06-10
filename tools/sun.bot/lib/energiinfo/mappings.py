data_type = {
  'ActiveEnergy': {
    'unit_key': ''
  }
}

def parse_data(entity, data):
  entity = data['signal']

  if entity == "temp":
    return {
      'value': data['value'].encode('UTF-8'),
      'timestamp': parse_date(data['time'].encode('UTF-8')),
    }
  elif entity == "ActiveEnergy":
    return {
      'value': data['value'].encode('UTF-8'),
      'timestamp': parse_date(data['time'].encode('UTF-8')),
    }
  else:
    return None

# input: 2017120321
def parse_date(date):
  year = date[0:4]
  month = date[4:6]
  day = date[6:8]
  hour = date[8:10]
  return "{}-{}-{} {}:00:00".format(year, month, day, hour)