# Change this to the host you want to benchmark
HOST='172.18.17.171:4000'
# Number of requests parallel
CONCURRENTLY=120
# Number of requests total to send
N=2000
# Timeout for each request
TIMEOUT=4500

# DO NOT TOUCH
TOKEN='***REMOVED***'




# ab -H "Authorization: $TOKEN" -s $TIMEOUT -k -c $CONCURRENTLY -n $N "$HOST/1/locations"
ab -H "Authorization: $TOKEN" -s $TIMEOUT -k -c $CONCURRENTLY -n $N "$HOST/1/check"
# ab -p auth_correct_json.txt -T application/json -k -c $CONCURRENTLY -n $N "$HOST/1/auth"