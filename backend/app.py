from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
from models.todo import Todo
from config import Config
from db import db
import json
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)
db.init_app(app)
from models.todo import Todo

def create_tables():
    db.create_all()

# Get all todos
@app.route("/todos", methods=["GET"])
@cross_origin()
def get_todos():
    todos = Todo.query.all()
    return jsonify([todo.to_dict() for todo in todos])

# Add a new todo
@app.route("/todos", methods=["POST"])
def add_todo():
    data = request.json
    new_todo = Todo(
        title=data.get("title"),
        desc=data.get("desc", "")
    )
    db.session.add(new_todo)
    db.session.commit()
    return jsonify(new_todo.to_dict()), 201

# Delete a todo
@app.route("/todos/<int:id>", methods=["DELETE"])
def delete_todo(id):
    todo = Todo.query.get(id)
    if not todo:
        return jsonify({"error": "Todo not found"}), 404
    db.session.delete(todo)
    db.session.commit()
    return jsonify({"message": "Deleted"}), 200

# Update a todo (optional)
@app.route("/todos/<int:id>", methods=["PUT"])
def update_todo(id):
    data = request.json
    todo = Todo.query.get(id)
    if not todo:
        return jsonify({"error": "Todo not found"}), 404
    todo.title = data.get("title", todo.title)
    todo.desc = data.get("desc", todo.desc)
    db.session.commit()
    return jsonify(todo.to_dict()), 200

with app.app_context():
    create_tables()

if __name__ == "__main__":
    app.run(debug=True)
