import React, { useState } from 'react';
import './TodosPage.css'

function FetchingData({onClose}){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    function handleFetch(){
      fetch('https://localhost:3000/todo', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(
            {title,
            description}
        )
    })
    }
    
    return(
        <>
        <div className='addTodo-form'>
            <div className='addTodo-form-container'>
            <button onClick={onClose} className='close-btn'>X</button>
            <h1 style={{letterSpacing: -1.5, lineHeight: 1}}>Add new todo.</h1>
            <small style={{textAlign: 'center'}}>Enter following detail to add a new todo</small>
            <div className='addTodo-container'>
                <label htmlFor="title" className='title-label'>title</label>
                <input type="text" id="title" name="title" value={title} onChange={(e)=> setTitle(e.target.value)} placeholder="John"></input>
                <label htmlFor='description' className='description-label'>description</label>
                <input type="text" className="description" id='description' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='m@example.com'></input>
                <button type='button' className='addTodo-btn' onClick ={()=> handleFetch()} > Add </button>
            </div>
            </div>
        </div>
        </>
    )
}

function TodosPage() {
  const [todos, setTodos] = useState([
    {
        title: 'Morning Workout',
        description: '30-minute cardio session followed by full-body stretches.',
        isCompleted: true,
      },
      {
        title: 'Grocery Shopping',
        description: 'Buy vegetables, fruits, milk, and snacks for the week. Don’t forget oats and peanut butter!',
        isCompleted: false,
      }
  ]);
  const [showModel, setShowModel] = useState(false);

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
      {showModel && <FetchingData onClose={() => setShowModel(false)} />}
    </>
  );
}

export default TodosPage;
