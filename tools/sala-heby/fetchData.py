import requests
from pprint import pprint
import CONFIG

accessToken = "***REMOVED***"

apiUrl = "https://***REMOVED***/PlatformAPI/3.2/"
# url = "https://***REMOVED***/PlatformAPI/3.2/?access_token==&cmd=period"

#https://***REMOVED***/PlatformAPI/3.2/?access_token=&cmd=login
def apiCall(method, cmd, token = ''):
  params = {
    'cmd': cmd,
    'token': token
  }
  req = requests.Session()
  req.params = params
  req.url = apiUrl
  return req

def getToken():
  call = apiCall('POST', 'login')
  return call
  call.data = CONFIG.auth
  # return call.send()

def fetchCmd(cmd, data):
  params = {
    'access_token': accessToken,
    'cmd': cmd
  }
  return requests.post(apiUrl, data=data, params=params);

# KVV Solcell SE76
data = {
  "meteringpoint_id": "4513",
  "period": "20171027",
  "signal": "ActiveEnergy",
  "interval": "hour"
}

# token = getToken()
# pprint(token.__dict__)

resp = fetchCmd("period", data)
pprint(resp.__dict__)
