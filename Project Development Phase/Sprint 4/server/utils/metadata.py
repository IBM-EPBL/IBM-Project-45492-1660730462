
class MetaData:
    __instance = None
    __metadata = None
    def __new__(cls):
        if MetaData.__instance is None:
            MetaData.__instance = object.__new__(cls)
            MetaData.__metadata = {}
        return MetaData.__instance

    def get_metadata(self):
        return MetaData.__metadata

    def set_data(self, key, value):
        MetaData.__metadata[key] = value

    def get_data(self, key):
        metadata = MetaData.__metadata
        return metadata.get(key, None)

    def get_diesel_price(self):
        metadata = MetaData.__metadata
        if(metadata is not None):
            print(metadata)
            fuelPrice = metadata.get('fuelPrice', None)
            if(fuelPrice is not None):
                return fuelPrice.get('diesel', 0)
