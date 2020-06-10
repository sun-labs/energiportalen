import os
from lib.***REMOVED*** import api
from lib.***REMOVED*** import CONFIG as C
from lib.***REMOVED*** import mappings as m


auth = api.getAuthVars(**C.auth)
facilities = api.getFacilities(auth)['list']

