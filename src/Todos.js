import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [editedTodoText, setEditedTodoText] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/todos');
      setTodos(response.data.todos);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    }
  };

  const addTodo = async () => {
    try {
      const response = await axios.post('https://dummyjson.com/todos/add', {
        todo: newTodo,
        completed: false,
        userId: 1, // Assuming a default user ID
      });
      setTodos([...todos, response.data]);
      setNewTodo('');
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  const updateTodo = async (id) => {
    try {
      const response = await axios.put(`https://dummyjson.com/todos/${id}`, {
        todo: editedTodoText,
      });
      setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)));
      setEditingTodo(null);
      setEditedTodoText('');
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`https://dummyjson.com/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  const startEditing = (todo) => {
    setEditingTodo(todo);
    setEditedTodoText(todo.todo);
  };

  const cancelEditing = () => {
    setEditingTodo(null);
    setEditedTodoText('');
  };

  return (
    <div>
      <h2>Todos</h2>
      <input
        type="text"
        placeholder="New Todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editingTodo && editingTodo.id === todo.id ? (
              <>
                <input
                  type="text"
                  value={editedTodoText}
                  onChange={(e) => setEditedTodoText(e.target.value)}
                />
                <button onClick={() => updateTodo(todo.id)}>Save</button>
                <button onClick={cancelEditing}>Cancel</button>
              </>
            ) : (
              <>
                {todo.todo}
                <button onClick={() => startEditing(todo)}>Edit</button>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
