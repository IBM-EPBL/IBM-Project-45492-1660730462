from flask import Flask, jsonify, request, g, make_response
from utils.prediction import MultiModel, DataSet
from app import app
from utils.np_encoder import NpEncoder
import pandas
import json
import os
from utils.models import UserSinglePrediction, UserMultiplePrediction
from utils.helper import token_required, msgResponse, date_str_from_datetime_obj
from utils.models import db
from utils.report_generator import PDF
from utils.metadata import MetaData
from sqlalchemy.sql import func

model = MultiModel()
dataset = DataSet()
metadata = MetaData()


@app.route('/predict/single', methods=['POST'])
@token_required
def singleSamplePrediction():
    data = request.get_json()
    vehicle_number = data['vehicleNumber'] or 'TN XX YY ZZZZ'
    vehicle_weight = data['vehicleWeight'] or 0
    payload_weight = data['payloadWeight'] or 0
    mileage = data['mileage'] or 0
    distance = data['distance'] or 0
    avg_speed = data['averageSpeed'] or 0
    road_type = data['roadType'] or 0
    fuel_type = data['fuelType'] or 0
    userId = g.get('userId')

    predicted = model.predict(
        [[mileage, vehicle_weight, payload_weight, distance, avg_speed, road_type, fuel_type]])

    fuelTypeString = dataset.inverse_transform('fuel_type', [fuel_type])[0]
    roadTypeString = dataset.inverse_transform('road_type', [road_type])[0]
    userPrediction = UserSinglePrediction(userId=userId, vehicleNumber=vehicle_number, mileage=mileage, fuelType=fuelTypeString, roadType=roadTypeString,
                                          distance=distance, averageSpeed=avg_speed, vehicleWeight=vehicle_weight, payloadWeight=payload_weight, predicted=float(predicted[0]), userMultiplePredictionId=None)

    try:
        db.session.add(userPrediction)
        db.session.commit()
        return jsonify({'predictedValue': float(predicted[0]), 'id': userPrediction.id}), 200
    except Exception as e:
        db.session.rollback()
        print(e)
        return msgResponse("Something went wrong"), 400


@app.route('/predict/multiple', methods=['POST'])
@token_required
def multiSamplePrediction():
    csvFile = request.files.get('csvFile')
    df = pandas.read_csv(csvFile)
    predicted = []
    fuel_type_encoded = dataset.encode_label('fuel_type', df['fuel_type'])
    road_type_encoded = dataset.encode_label('road_type', df['road_type'])
    userId = g.get('userId')

    print(df.head())
    try:

        userMultiplePrediction = UserMultiplePrediction(userId=userId)
        db.session.add(userMultiplePrediction)
        db.session.flush()

        sampleInputs = []

        for index, row in df.iterrows():
            vehicleNumber = row['vehicle_number'] or 'TN XX YY ZZZZ'
            mileage = float(row['mileage']) or 0
            vehicle_weight = float(row['vehicle_weight']) or 0
            payload_weight = float(row['payload_weight']) or 0
            distance = float(row['distance']) or 0
            avg_speed = float(row['avg_speed']) or 0
            road_type = int(road_type_encoded[index]) or 0
            fuel_type = int(fuel_type_encoded[index]) or 0
            fuel_type_string = str(row['fuel_type'])
            road_type_string = str(row['road_type'])

            sampleInputs.append(
                [mileage, vehicle_weight, payload_weight, distance, avg_speed, road_type, fuel_type])
        predictedValue = model.predict(sampleInputs)

        for index, row in df.iterrows():
            vehicleNumber = row['vehicle_number'] or 'TN XX YY ZZZZ'
            mileage = float(row['mileage']) or 0
            vehicle_weight = float(row['vehicle_weight']) or 0
            payload_weight = float(row['payload_weight']) or 0
            distance = float(row['distance']) or 0
            avg_speed = float(row['avg_speed']) or 0
            road_type = int(road_type_encoded[index]) or 0
            fuel_type = int(fuel_type_encoded[index]) or 0
            fuel_type_string = str(row['fuel_type'])
            road_type_string = str(row['road_type'])
            predicted.append({'id': index, 'name': vehicleNumber, 'mileage': mileage, 'vehicleWeight': vehicle_weight, 'payloadWeight': payload_weight,
                              'distance': distance, 'averageSpeed': avg_speed, 'roadType': road_type_string, 'fuelType': fuel_type_string, 'predictedValue': round(float(predictedValue[index]), 2)})
            userSinglePrediction = UserSinglePrediction(userId=userId, vehicleNumber=vehicleNumber, mileage=mileage, fuelType=row['fuel_type'], roadType=row['road_type'],
                                                        distance=distance, averageSpeed=avg_speed, vehicleWeight=vehicle_weight, payloadWeight=payload_weight, predicted=round(float(predictedValue[index]),2), userMultiplePredictionId=userMultiplePrediction.id)
            db.session.add(userSinglePrediction)

        db.session.commit()
        return json.dumps({'predicted': predicted, 'id': userMultiplePrediction.id}, cls=NpEncoder), 200
    except Exception as e:
        db.session.rollback()
        print(e)
        return msgResponse("Something Went Wrong"), 400


@app.route('/history/single', methods=['GET'])
@token_required
def singleSamplePredictionHistory():
    userId = g.get('userId')
    userName = g.get('userName')
    predictions = UserSinglePrediction.query.filter_by(
        userId=userId).filter_by(userMultiplePredictionId=None).all()
    prediction_response = []
    for prediction in predictions:
        prediction_response.append({'id': prediction.id, 'name': userName, 'vehicleNumber': prediction.vehicleNumber, 'mileage': prediction.mileage, 'fuelType': prediction.fuelType, 'distance': prediction.distance, 'roadType': prediction.roadType,
                                   'averageSpeed': prediction.averageSpeed, 'vehicleWeight': prediction.vehicleWeight, 'payloadWeight': prediction.payloadWeight, 'predictedValue': prediction.predicted, 'actualValue': prediction.actual})
    return prediction_response, 200


@app.route('/history/multiple', methods=['GET'])
@token_required
def multipleSamplePredictionHistory():
    userId = g.get('userId')
    userName = g.get('userName')
    predictions = db.session.query(UserMultiplePrediction.id, func.count(), UserMultiplePrediction.createdAt, ).join(
        UserSinglePrediction).group_by(UserMultiplePrediction.id).filter_by(userId=userId).all()
    prediction_response = []
    for prediction in predictions:
        prediction_response.append({'id': str(prediction[0]), 'sample_count': str(
            prediction[1]), 'created_at': date_str_from_datetime_obj(prediction[2])})
    return prediction_response, 200


@app.route('/report/single/<id>', methods=['GET'])
@token_required
def singleSampleReport(id):
    prediction = UserSinglePrediction.query.filter_by(id=id).first()
    userName = g.get('userName')
    pdf = PDF()
    singleSampleDataToPdfPage(pdf=pdf, prediction=prediction, userName=userName,
                              showUserName=True, fuelPrice=metadata.get_diesel_price())
    pdf.output("prediction.pdf")
    pdfOut = pdf.output(dest="S")
    response = make_response(pdfOut)
    response.headers['Content-Type'] = 'application/pdf'
    response.headers['Content-Disposition'] = 'attachment; filename=report.pdf'

    return response


@app.route('/report/multiple/<id>', methods=['GET'])
@token_required
def multiSampleReport(id):
    predictions = UserSinglePrediction.query.filter_by(
        userMultiplePredictionId=id).all()
    userName = g.get('userName')
    pdf = PDF()
    i = 0
    for prediction in predictions:
        if (i == 0):
            singleSampleDataToPdfPage(
                prediction=prediction, pdf=pdf, userName=userName, showUserName=True)
        else:
            singleSampleDataToPdfPage(prediction=prediction, pdf=pdf)
        i = i + 1
    pdf.output("prediction.pdf")
    pdfOut = pdf.output(dest="S")
    response = make_response(pdfOut)
    response.headers['Content-Type'] = 'application/pdf'
    response.headers['Content-Disposition'] = 'attachment; filename=report.pdf'

    return response


def singleSampleDataToPdfPage(prediction, pdf, userName="", showUserName=False, fuelPrice=0):
    pdf.add_page()
    if (showUserName):
        pdf.set_header_report_detail(
            name=userName, predictionDate=date_str_from_datetime_obj(prediction.createdAt))
    scatter_img = dataset.generate_scatter(actual_coordinates=None, predicted_coordinates=(
        prediction.distance, prediction.predicted))
    pdf.set_predicted_value(predictedValue=str(round(prediction.predicted, 2)), predictedPrice=str(
        round(float(fuelPrice) * float(prediction.predicted), 2)))
    pdf.set_vehicle_details(vehicleNumber=prediction.vehicleNumber, mileage=str(prediction.mileage), distance=str(prediction.distance), roadType=str(prediction.roadType), fuelType=str(
        prediction.fuelType), averageSpeed=str(prediction.averageSpeed), payloadWeight=str(prediction.payloadWeight), vehicleWeight=str(prediction.vehicleWeight), fuelPrice=str(fuelPrice))
    pdf.set_scatter_plot(scatter_img)
    os.remove(scatter_img)
