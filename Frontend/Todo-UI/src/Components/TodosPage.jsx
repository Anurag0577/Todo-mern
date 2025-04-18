import React, { useState } from 'react';
import './TodosPage.css';

function FetchingData({ onClose, refreshTodos }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  function handleFetch() {
    const token = localStorage.getItem('Token'); // Retrieve the token from localStorage

    fetch('http://localhost:3000/todo', { // Use http instead of https if running locally
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Add the token with the Bearer prefix
      },
      body: JSON.stringify({
        title,
        description,
        isCompleted: false // Default value for new todos
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
        refreshTodos(); // Refresh the todos list after adding a new todo
        onClose(); // Close the modal
      })
      .catch((error) => {
        console.error('Error adding todo:', error);
      });
  }

  return (
    <>
      <div className='addTodo-form'>
        <div className='addTodo-form-container'>
          <button onClick={onClose} className='close-btn'>X</button>
          <h1 style={{ letterSpacing: -1.5, lineHeight: 1 }}>Add new todo.</h1>
          <small style={{ textAlign: 'center' }}>Enter the following details to add a new todo</small>
          <div className='addTodo-container'>
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
            <button type='button' className='addTodo-btn' onClick={handleFetch}>Add</button>
          </div>
        </div>
      </div>
    </>
  );
}

function TodosPage() {
  const [todos, setTodos] = useState([]);
  const [showModel, setShowModel] = useState(false);

  const token = localStorage.getItem('Token');

  function fetchTodos() {
    fetch('http://localhost:3000/todos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
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
        setTodos(data); // Update the todos state with the fetched data
      })
      .catch((err) => {
        console.error('Error fetching todos:', err);
      });
  }

  React.useEffect(() => {
    fetchTodos(); // Fetch todos when the component mounts
  }, []);

  function todoToggle(index) {
    setTodos((prevTodos) =>
      prevTodos.map((todo, i) =>
        i === index ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  }

  const todo = todos.map((element, index) => {
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
          <small>{element.isCompleted ? 'Completed' : 'Uncompleted'}</small>
        </div>
      </div>
    );
  });

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
            <div className='todos-container'>{todo}</div>
          </div>
        </div>
      </div>
      {showModel && <FetchingData onClose={() => setShowModel(false)} refreshTodos={fetchTodos} />}
    </>
  );
}

export default TodosPage;
