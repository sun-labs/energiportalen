import requests
from pprint import pprint
import time
from datetime import date, timedelta
import os.path
import sys

import CONFIG

# Get information such as access tokens, name of account
def getAuthVars(username = None, password = None, site = None):
  data = {
    'username': username,
    'password': password,
    'site': site, # the site to login from
    'captcha': ''
  }
  return apiCall('login', data = data)
  # return json.load(open('auth.json'))

# create api request and parse response
def apiCall(cmd, method = 'POST', auth  = {'access_token': ''}, data = {}):
  req = prepApiCall(cmd, method, auth, data)
  return sendApiCall(req)

# prepare api call
def prepApiCall(cmd, method, auth, data):
  params = {
    'cmd': cmd,
    'access_token': auth['access_token']
  }
  return requests.Request(
    method = method,
    url = CONFIG.api['url'],
    params = params,
    data = data
  ).prepare()

# send api call to server and parse response as json
def sendApiCall(req):
  s = requests.Session()
  return s.send(req).json()

# get facilities registered to the signed in user
def getFacilities(auth):
  return apiCall('meteringpoints', auth=auth)

def getServices(auth):
  return apiCall('services', auth=auth)

# get info such as if the api received new data or not, 
def getAPIStatus(auth):
  return apiCall('loader/status', auth=auth)

def getInvoices(auth, period = None):
  data = { 'period': period }
  return apiCall('invoices', auth=auth, data=data)

def search(auth, search = ''):
  data = { 'search': search }
  return apiCall('personnel/customer/search', auth=auth, data=data)

def getDateYesterday():
  yesterday = date.today() - timedelta(1)
  return yesterday.strftime("%Y%m%d")

def getDateToday():
  return time.strftime("%Y%m%d")

def get_log_data_from(auth, facility_id, period = None, interval = None, signal = None, data_type = None):
  if period is None:
    period = getDateYesterday()
  data = {
    'meteringpoint_id': facility_id,
    'period': period,
    'signal': signal,
    'interval': interval
  }
  return apiCall(data_type, auth=auth, data=data)