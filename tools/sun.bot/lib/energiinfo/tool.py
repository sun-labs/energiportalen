import api
import CONFIG
import argparse
from pprint import pprint
import json
import time
import os

# parse terminal arguments
ACTIONS = ['temp', 'energy', 'info', 'services', 'invoices', 'search'];
INTERVALS = ['day', 'hour', 'month', 'year']
SIGNALS = ['ActiveEnergy']
parser = argparse.ArgumentParser()
parser.add_argument('action', metavar='action', choices=ACTIONS, help="The action to perform")
parser.add_argument('--period', help="The period of which to download data", type=str, default=api.getDateYesterday())
parser.add_argument('--signal', help="The signal to analyze", choices=SIGNALS, default='')
parser.add_argument('--interval', help="The interval of data collected", choices=INTERVALS, default='hour')
parser.add_argument('--fac', '-f', help="The id of the facility to pinpoint", type=str)

parser.add_argument('--search', help="Search stuff", type=str, default='')

parser.add_argument('--store', '-s', help="When supplied, tool will store fetched data on your harddrive", action='store_true')
parser.add_argument('--output-dir', '-o', help="The location of where to store data fetched from the API.", default=CONFIG.store['path'])

parser.add_argument('--username', '-u', help="The username to sign in with", type=str, default=CONFIG.auth['username'])
parser.add_argument('--password', '-p', help="The password to authenticate supplied username with", type=str, default=CONFIG.auth['password'])
parser.add_argument('--site', help="Not sure, but it's passed along with the auth call", type=str, default=CONFIG.customer['site'])

# User interface
def print_facs(facs):
  print("")
  print("ID\t\tName")
  print("------------------------------------")
  for fac in facs:
    f_id = get_key_from_fac(fac)
    f_alias = get_alias_from_fac(fac);
    print("{}\t\t{}".format(f_id, f_alias))
  print("")

def print_fac(fac):
  print("-----------------------------------")
  pprint(fac)
  print("-----------------------------------")

# Mapping functions
def get_alias_from_fac(fac):
  return fac['alias'].replace('\n', '').encode('UTF-8');

def get_key_from_fac(fac):
  return fac['meteringpoint_id'];

def get_signals_from_fac(fac):
  return fac['signals'];

def get_timestamp():
  return time.strftime("%Y%m%d_%H%M%S")

def store_data(file_name, data):
  file_path = "{}/{}".format(args.output_dir, file_name) # full path of the file
  file = open(file_path, 'w'); # open file (or create it)
  file.write(json.dumps(data))
  file.close()
  size = os.stat(file_path).st_size / 1024
  print("Stored {} kB of data @ {}.".format(size, file_path))

# Execution of tool
print("""
                   _       _         
                  | |     | |        
 ___ _   _ _ __   | | __ _| |__  ___ 
/ __| | | | '_ \  | |/ _` | '_ \/ __|
\__ \ |_| | | | | | | (_| | |_) \__ \\
|___/\__,_|_| |_| |_|\__,_|_.__/|___/

Welcome to ***REMOVED*** unofficial API.                               
                 Hihi.
""")

args = parser.parse_args() # get arguments supplied by the user (kill if invalid arguments)
action = args.action # what to do
arg_fac = args.fac # specific facility supplied?

auth = api.getAuthVars(username = args.username, password = args.password, site = args.site) # sign in
facs = api.getFacilities(auth)['list'] # get facilities from API
data = None # the variable will contain all the related data from the API in the end of this script.

if arg_fac is not None: # facility id supplied
  facs = filter(lambda fac: get_key_from_fac(fac) == arg_fac, facs) # remove every fac except the one requested
  if (len(facs) <= 0): # if there's no facility left after trimming
    print("The id {} does not exist. Try the action 'info' to get a list of facilities.".format(arg_fac))
    exit()

# actions that do not download logging data from a facility
if action == "info": # print info of the facilities/facility
  if (len(facs) == 1): # single facility
    print_fac(facs[0])
  else: # all the facilities
    print_facs(facs)
    print("Use the '--fac id' argument for detailed data about a facility")
  exit() # done printing info, kill it
elif action == "services":
  data = api.getServices(auth)
elif action == "invoices":
  data = api.getInvoices(auth, period = args.period)
elif action == "search":
  data = api.search(auth, search = args.search)

# check if action matched and stored data
if data is not None: # is there data available?
  if args.store is True: # should we store it?
    file_name = "{}_{}.json".format(action, get_timestamp()) # name of the file
    store_data(file_name, data)
  else:
    pprint(data)
    exit()

# actions that DO download data from a facility/facilities.
for fac in facs:
  f_id = get_key_from_fac(fac)
  f_alias = get_alias_from_fac(fac)

  # set custom vars for each action
  data_type = ''
  signal = ''
  if action == "temp": # temperature specific variables (as per official API)
    data_type = 'temperature'
    signal = ''
  elif action == "energy": # energy specific variables (as per official  API)
    data_type = 'period'
    signal = 'ActiveEnergy'

  data = api.get_log_data_from(auth, f_id, data_type = data_type, signal = signal, period = args.period, interval = args.interval)

  if (args.store is True): # do we want to store it?
    file_name = "fac_{}_{}_{}.json".format(f_id, action, get_timestamp()) # name of the file
    store_data(file_name, data)
  else:
    pprint(data)