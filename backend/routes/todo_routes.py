from flask import Blueprint, request, jsonify
from models.todo import Todo
from db import db

todo_bp = Blueprint('todo_bp', __name__)

@todo_bp.route('/todos', methods=['GET'])
def get_todos():
    todos = Todo.query.all()
    return jsonify([{"id": t.id, "title": t.title, "desc": t.desc} for t in todos])

@todo_bp.route('/todos', methods=['POST'])
def add_todo():
    data = request.get_json()
    new_todo = Todo(title=data['title'], desc=data['desc'])
    db.session.add(new_todo)
    db.session.commit()
    return jsonify({"id": new_todo.id}), 201

@todo_bp.route('/todos/<int:id>', methods=['DELETE'])
def delete_todo(id):
    todo = Todo.query.get(id)
    if not todo:
        return jsonify({"error": "Todo not found"}), 404
    db.session.delete(todo)
    db.session.commit()
    return jsonify({"message": "Todo deleted"})
