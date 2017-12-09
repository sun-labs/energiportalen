import argparse
import importlib
import json

# constants
PARSERS = ['***REMOVED***']

# argument parser
_parser = argparse.ArgumentParser()
_parser.add_argument('input', metavar='input', help="", type=str)
_parser.add_argument('--parser', help="Which parser to use for the input data", choices=PARSERS)
args = _parser.parse_args()

# load correct parser
package_name = "{}.{}".format('parsers', args.parser)
mappings = importlib.import_module('{}.mappings'.format(package_name))
api = importlib.import_module('{}.api'.format(package_name))

# get content from file
file = open(args.input, 'r')
content = file.read()

# content as json
data = json.loads(content)['values']

normalized_data = []
for point in data:
  norm = mappings.parse_data(point)
  normalized_data.append(norm)

print normalized_data