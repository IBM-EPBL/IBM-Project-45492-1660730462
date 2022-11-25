import time
import datetime
import requests
import schedule
import threading
import flask
import os
from .metadata import MetaData

metadata = MetaData()

app = None
# def start_jobs():
#     # get_fuel_price(None)
#     schedule.every(2).seconds.do(test, 'Say Hi')
#     # schedule.every().day.at("01:00").do(get_fuel_price, 'Fuel Price Updated')
#     schedule.run_pending()
#     # asyncio.run(handle_async())
#     while True:
#         schedule.run_pending()
#         time.sleep(1)
#     return schedule.CancelJob

# async def handle_async():
#     print("Running code")


def test(data=None):
    print("data = ", data)


def handle_recursive_jobs(f_stop):

    print("Getting Fuel Prices")
    get_fuel_price()

    if not f_stop.is_set():
        t = threading.Timer(
            interval=86400, function=handle_recursive_jobs, args=[f_stop])
        t.daemon = True
        t.start()


def start_jobs(app):
    f_stop = threading.Event()
    app = app
    handle_recursive_jobs(f_stop)
    return f_stop


def get_fuel_price():
    data = {'id': '2022-11-17_10405', 'cityId': '10405', 'petrol': '102.62', 'diesel': '94.22', 'currency': 'INR', 'date': '2022-11-17', 'createdAt': 1668679206306, 'changeText': 'Petrol: ₹102.62 , Diesel: ₹94.22 ', 'petrolDiff': '0.00', 'dieselDiff': '0.00', 'cngDiff': None,
            'cngPrice': None}

    if (getattr(os.environ, 'ENV', "dev") == 'dev'):
        pass
        metadata.set_data('fuelPrice', data)
    else:
        print("Getting from API")
        url = ''
        headers = {
            'X-RapidAPI-Key': '',
            'X-RapidAPI-Host': ''
        }
        response = requests.get(url=url, headers=headers)
        response_json = response.json()
        print(response_json)
        metadata.set_data('fuelPrice', response_json['data']['fuelPrice'])
