import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib
import matplotlib.pyplot as plt
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression, Ridge, Lasso
import requests

import utils.helper as helper


class DataSet:
    __dataset = None
    __instance = None
    __mapping = {}
    __data_sample = None
    __le_encoders = {}

    def __new__(self):
        if DataSet.__instance is None:
            DataSet.__instance = super(DataSet, self).__new__(self)
            data = pd.read_csv("dataset/dataset.csv")
            DataSet.__dataset = data
            DataSet.__data_sample = data.sample(300)
            matplotlib.use('Agg')
            plt.figure(figsize=(3, 2), dpi=100)
            self.handle_outlier(self)
        return DataSet.__instance

    def get_dataset(self):
        return DataSet.__dataset

    def encode_label(self, col_name, col):
        if (col_name not in DataSet.__le_encoders):
            ValueError("Label Encoder not found for the given col_name")
        return DataSet.__le_encoders[col_name].transform(col)

    def inverse_transform(self, col_name, col):
        if (col_name not in DataSet.__le_encoders):
            ValueError("Label Encoder not found for the given col_name")
        return DataSet.__le_encoders[col_name].inverse_transform(col)

    def generate_scatter(self, actual_coordinates=None, predicted_coordinates=None):
        fig = plt.figure()
        sample_data = DataSet.__data_sample
        plt.scatter(sample_data['distance'], sample_data['consume'],
                    color='lightblue', label='Sample value', s=50)
        if (predicted_coordinates is not None):
            plt.scatter(predicted_coordinates[0], predicted_coordinates[1],
                        color='red', label='Predicted value', marker='o', s=60)
        if (actual_coordinates is not None):
            plt.scatter(actual_coordinates[0], actual_coordinates[1],
                        color='blue', label='Actual value', marker='*', s=200)
        plt.legend(loc="upper left")
        plt.xlabel('Distance')
        plt.ylabel('Consume')
        plt.title('Distance vs Consume')
        # print(plt)
        url = 'static/figs/' + helper.generate_random_string(10) + '.png'
        fig.savefig(url, format="png")
        return url

    def handle_outlier(self):
        dataset = self.__dataset

        le_fuel_type = LabelEncoder()
        dataset['fuel_type'] = le_fuel_type.fit_transform(dataset['fuel_type'])
        fuel_type_mapping = dict(
            zip(le_fuel_type.classes_, le_fuel_type.transform(le_fuel_type.classes_)))
        DataSet.__mapping['fuel_type'] = [{'name': key, 'value': value, 'label': str(
            key).upper()} for (key, value) in fuel_type_mapping.items()]

        DataSet.__le_encoders['fuel_type'] = le_fuel_type

        le_road_type = LabelEncoder()
        dataset['road_type'] = le_road_type.fit_transform(dataset['road_type'])
        road_type_mapping = dict(
            zip(le_road_type.classes_, le_road_type.transform(le_road_type.classes_)))
        DataSet.__mapping['road_type'] = [{'name': key, 'value': value, 'label': str(
            key).upper()} for (key, value) in road_type_mapping.items()]

        DataSet.__le_encoders['road_type'] = le_road_type

    def get_x(self):
        __dataset = DataSet.get_instance().get_dataset()
        return __dataset.drop(['consume'], axis=1).values

    def get_y(self):
        __dataset = DataSet.get_instance().get_dataset()
        return __dataset['consume']

    def get_mapping(self):
        return DataSet.__mapping

    # def get_accuracy():

    @staticmethod
    def get_instance():
        if DataSet.__dataset is None:
            DataSet.__instance = DataSet()
        return DataSet.__instance


class MultiModel():
    mltoken = None
    # ridgeModel = None
    # lassoModel = None
    __instance = None

    def __new__(self):
        if (MultiModel.__instance is None):
            MultiModel.__instance = super(MultiModel, self).__new__(self)
            #TODO: Move to env var
            API_KEY = "WyRSXpa3SVZLfrdKRAZl5-dMrKKyQFvF93YBTCgPDn9Q"
            token_response = requests.post('https://iam.cloud.ibm.com/identity/token', data={"apikey": API_KEY, "grant_type": 'urn:ibm:params:oauth:grant-type:apikey'})
            MultiModel.mltoken = token_response.json()["access_token"]
            print("Token = ", MultiModel.mltoken)
        return MultiModel.__instance

    def predict(self, data):
        payload_scoring = {"input_data": [{"fields": ["mileage", "vehicle_weight", "payload_weight", "distance", "avg_speed", "road_type", "fuel_type"], "values": 
            data}]
        }
        # payload_scoring = {"input_data": [{"fields": ["mileage", "vehicle_weight", "payload_weight", "distance", "avg_speed", "road_type", "fuel_type"], "values": [
        #     [4, 7, 3, 69, 31, "asphalt", 1]]}]}

        print("Data = ", data)

        response_scoring = requests.post('https://us-south.ml.cloud.ibm.com/ml/v4/deployments/2af4ebdb-fd05-4f86-94a7-3b5cf2078383/predictions?version=2022-11-18', json=payload_scoring,
            headers={'Authorization': 'Bearer ' + MultiModel.mltoken})

        print(response_scoring.json())

        response = response_scoring.json()['predictions'][0]['values']
        res = []
        for i in response:
            res.append(i[0])
        print("Res = ", res)
        return res


    # def predict(self, data):
    #     mlr_predicted_val = MultiModel.mlrModel.predict(data)
    #     # print("Mlr = ", mlr_predicted_val)

    #     # lasso_predicted_val = MultiModel.lassoModel.predict(data)
    #     # print("Lasso = ", lasso_predicted_val)

    #     # ridge_predicted_val = MultiModel.ridgeModel.predict(data)
    #     # print("Ridge = ", ridge_predicted_val)

    #     # return (mlr_predicted_val + lasso_predicted_val) / 2
    #     return mlr_predicted_val
