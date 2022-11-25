import requests

# NOTE: you must manually set API_KEY below using information retrieved from your IBM Cloud account.
API_KEY = "WyRSXpa3SVZLfrdKRAZl5-dMrKKyQFvF93YBTCgPDn9Q"
token_response = requests.post('https://iam.cloud.ibm.com/identity/token', data={"apikey":
                                                                                 API_KEY, "grant_type": 'urn:ibm:params:oauth:grant-type:apikey'})
mltoken = token_response.json()["access_token"]

header = {'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + mltoken}

# NOTE: manually define and pass the array(s) of values to be scored in the next line
payload_scoring = {"input_data": [{"fields": ["mileage", "vehicle_weight", "payload_weight", "distance", "avg_speed", "road_type", "fuel_type"], "values": [
    [4, 7, 3, 69, 31, 0, 1], [4, 7, 3, 69, 31, 0, 1]]}]}

response_scoring = requests.post('https://us-south.ml.cloud.ibm.com/ml/v4/deployments/2af4ebdb-fd05-4f86-94a7-3b5cf2078383/predictions?version=2022-11-18', json=payload_scoring,
                                 headers={'Authorization': 'Bearer ' + mltoken})
print("Scoring response")
response = response_scoring.json()
print(response)
print(response['predictions'][0]['values'])
# print(response_scoring.json())
