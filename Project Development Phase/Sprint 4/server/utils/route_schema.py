from cerberus import Validator


__registerSchema = {'email': {'type': 'string', 'required': True}, 'password': {'type': 'string', 'required': True}, 'mobile': {
    'type': 'integer', 'required': True}, 'name': {'type': 'string', 'required': True}, }
registerValidator = Validator(__registerSchema)

__loginRequestSchema = {'email': {'type': 'string', 'required': True}, 'password': {
    'type': 'string', 'required': True}}
loginRequestValidator = Validator(__loginRequestSchema)

__otpRequestSchema = {'token': {'type': 'string', 'required': True}, 'otp': {
    'type': 'integer', 'required': True}}
otpRequestValidator = Validator(__otpRequestSchema)