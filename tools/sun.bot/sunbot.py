import argparse
import importlib
import json
import os

import lib.api_energiportalen as sunbot

# constants
PARSERS = ['***REMOVED***']

# argument parser
_parser = argparse.ArgumentParser()
_parser.add_argument('input', metavar='input', help="", type=str)
_parser.add_argument('--parser', help="Which parser to use for the input data", choices=PARSERS)
_parser.add_argument('--unit-key', help="Select the unit key to associate the data with")
args = _parser.parse_args()

# load correct parser module
package_name = "{}.{}".format('parsers', args.parser)
mappings = importlib.import_module('{}.mappings'.format(package_name))
api = importlib.import_module('{}.api'.format(package_name))

# get content from file
file = open(args.input, 'r')
content = file.read()

# content as json
data = json.loads(content)['values']
data_len = len(data)

# facility specific values
uk = sunbot.get_unit_keys(args.unit_key)

if len(uk) == 0:
  exit("No such unit key")
else:
  uk = uk[0]

added_points = 0
for point in data:
  os.system('clear')
  norm = mappings.parse_data(point)
  val_id = sunbot.add_unit_data(unit_id = uk['unit_id'], unit_key = uk['id'], **norm)
  added_points += 1
  print("Sun.bot".encode('UTF-8'))
  print("-------------------------")
  print("Progress: {}/{} points".format(added_points, data_len))
  print("Input: {}".format(args.input))
  print("")