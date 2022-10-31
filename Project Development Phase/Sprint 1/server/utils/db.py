from flask_sqlalchemy import SQLAlchemy

class DBConnection:
    _db = None

    def __new__(cls):
        if DBConnection._db is None:
            DBConnection._db = object.__new__(cls)
        return DBConnection._db

    def __new__(cls, app):
        if cls._db is None:
            db = SQLAlchemy(app)
            cls._db = db
        return cls._db

    def get_conn(self):
        return self._db
