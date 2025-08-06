from db import db

class Todo(db.Model):
    __tablename__ = 'todos'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    desc = db.Column(db.String(300), nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "desc": self.desc
        }
