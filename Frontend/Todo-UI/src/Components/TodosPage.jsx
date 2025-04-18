import React, { useState, useEffect } from 'react';
import './TodosPage.css';

function FetchData({ onClose, prevTitle, prevDescription, id, refreshTodos }) {
  const [title, setTitle] = useState(prevTitle);
  const [description, setDescription] = useState(prevDescription);

  function handleEdit() {
    const token = localStorage.getItem('Token');

    fetch(`http://localhost:3000/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title,
        description
      })
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to update todo');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Todo updated successfully:', data);
      refreshTodos(); // Refresh the todos list after updating
      onClose(); // Close the modal
    })
    .catch((error) => {
      console.error('Error updating todo:', error);
    });
  }

  return (
    <div className='editTodo-form'>
      <div className='editTodo-form-container'>
        <button onClick={onClose} className='close-btn'>X</button>
        <h1 style={{ letterSpacing: -1.5, lineHeight: 1 }}>Edit todo</h1>
        <small style={{ textAlign: 'center' }}>Update the details of your todo</small>
        <div className='editTodo-container'>
          <label htmlFor="edit-title" className='title-label'>Title</label>
          <input
            type="text"
            id="edit-title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
          />
          <label htmlFor='edit-description' className='description-label'>Description</label>
          <input
            type="text"
            className="description"
            id='edit-description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Enter description'
          />
          <button type='button' className='editTodo-btn' onClick={handleEdit}>Update</button>
        </div>
      </div>
    </div>
  );
}

function FetchingData({ onClose, refreshTodos }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  function handleFetch() {
    const token = localStorage.getItem('Token');

    fetch('http://localhost:3000/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title,
        description,
        isCompleted: false
      })
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to add todo');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Todo added successfully:', data.todo);
      refreshTodos();
      onClose();
    })
    .catch((error) => {
      console.error('Error adding todo:', error);
    });
  }

  return (
    <div className='editTodo-form'>
      <div className='editTodo-form-container'>
        <button onClick={onClose} className='close-btn'>X</button>
        <h1 style={{ letterSpacing: -1.5, lineHeight: 1 }}>Add new todo</h1>
        <small style={{ textAlign: 'center' }}>Enter the following details to add a new todo</small>
        <div className='editTodo-container'>
          <label htmlFor="title" className='title-label'>Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
          />
          <label htmlFor='description' className='description-label'>Description</label>
          <input
            type="text"
            className="description"
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Enter description'
          />
          <button type='button' className='editTodo-btn' onClick={handleFetch}>Add</button>
        </div>
      </div>
    </div>
  );
}

function TodosPage() {
  const [todos, setTodos] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [showEditModel, setShowEditModel] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);

  const token = localStorage.getItem('Token');

  function fetchTodos() {
    fetch('http://localhost:3000/todos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Fetched todos:', data);
      // Handle both array and object responses
      if (Array.isArray(data)) {
        setTodos(data);
      } else if (data && Array.isArray(data.todos)) {
        setTodos(data.todos);
      } else {
        console.error('Unexpected data format:', data);
        setTodos([]);
      }
    })
    .catch((err) => {
      console.error('Error fetching todos:', err);
      setTodos([]);
    });
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  function deleteTodo(id) {
    const token = localStorage.getItem('Token');
    fetch(`http://localhost:3000/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      }
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Deleted successfully', data);
      fetchTodos();
    })
    .catch((error) => console.log(error));
  }

  function todoToggle(index) {
    setTodos((prevTodos) =>
      prevTodos.map((todo, i) =>
        i === index ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  }

  function handleEditClick(todoItem) {
    setCurrentTodo(todoItem);
    setShowEditModel(true);
  }

  // Safety check before rendering todos
  const todoElements = Array.isArray(todos) ? todos.map((element, index) => {
    return (
      <div key={index} className='todo-element'>
        <input
          type='checkbox'
          className='todo-data-checkbox'
          checked={element.isCompleted}
          onChange={() => todoToggle(index)}
        />
        <div className='todo-data' onClick={() => todoToggle(index)}>
          <h2 className='todo-title'>{element.title}</h2>
          <p className='todo-description'>{element.description}</p>
          <div className='todo-bottom-bar'>
            <small style={{flex:1}}>{element.isCompleted ? 'Completed' : 'Uncompleted'}</small>
            <small className="material-symbols-outlined" onClick={() => deleteTodo(element._id)}>Delete</small>
            <small className="material-symbols-outlined" onClick={() => handleEditClick(element)}>Edit</small>
          </div>
        </div>
      </div>
    );
  }) : <p>No todos available</p>;

  return (
    <> 
      <div className='todo-page-container'>
        <div className='todo-page-header'>
          <button type='button' className='logout-button'>
            Logout
          </button>
          <h1 className='logo-text'>Todo App</h1>
          <p className='into-text'>Hi, </p>
        </div>

        <div className='todo-content'>
          <div className='lhs-container'>
            <h1 className='lhs-container-heading'>
              Conquer Your Day - Plan, Track, Succeed!
            </h1>
            <button className='lhs-container-btn' onClick={() => setShowModel(true)}>+ Add Todo</button>
          </div>
          <div className='rhs-container'>
            <h1 className='rhs-container-heading'></h1>
            <div className='todos-container'>{todoElements}</div>
          </div>
        </div>
      </div>
      {showModel && <FetchingData onClose={() => setShowModel(false)} refreshTodos={fetchTodos} />}
      {showEditModel && currentTodo && (
        <FetchData 
          onClose={() => setShowEditModel(false)} 
          prevTitle={currentTodo.title} 
          prevDescription={currentTodo.description} 
          id={currentTodo._id}
          refreshTodos={fetchTodos}
        />
      )}
    </>
  );
}

export default TodosPage;