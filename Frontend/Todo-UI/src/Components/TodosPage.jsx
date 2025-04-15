import React, { useState } from 'react';
import './TodosPage.css'

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
      },
      {
        title: 'Office Meeting',
        description: 'Weekly team sync-up at 10:30 AM. Discuss project deadlines, client feedback, and upcoming sprint planning.',
        isCompleted: false,
      },
      {
        title: 'Clean the Bedroom',
        description: 'Organize the wardrobe, change bedsheets, vacuum the carpet, and dust off shelves.',
        isCompleted: true,
      },
      {
        title: 'Learn React',
        description: 'Watch tutorial on useEffect and useRef hooks. Try building a small component to test understanding.',
        isCompleted: false,
      },
      {
        title: 'Call Mom',
        description: 'Check on how things are at home and share updates about work.',
        isCompleted: true,
      },
      {
        title: 'Pay Electricity Bill',
        description: 'Due tomorrow. Use the UPI app or website. Check if cashback is available.',
        isCompleted: false,
      },
      {
        title: 'Write Blog Post',
        description: 'Draft a blog on “Productivity Tips While Working Remotely”. Include personal experiences and helpful tools.',
        isCompleted: false,
      },
      {
        title: 'Dinner with Friends',
        description: 'Meet at Truffle House Cafe at 8 PM. Don’t forget to book a table for 5 people in advance.',
        isCompleted: false,
      },
      {
        title: 'Laundry',
        description: 'Wash whites and delicates separately. Fold clothes and place in wardrobe.',
        isCompleted: true,
      },
      {
        title: 'Online Course',
        description: 'Complete Module 5: “Optimizing Web Performance” from the Frontend Masters course. Take notes!',
        isCompleted: false,
      },
      {
        title: 'Meditation',
        description: 'Evening mindfulness session for 15 minutes using the Calm app.',
        isCompleted: true,
      },
      {
        title: 'Backup Laptop Data',
        description: 'Transfer important documents, code projects, and photos to an external hard drive or cloud storage.',
        isCompleted: false,
      },
      {
        title: 'Read a Book',
        description: 'Continue reading “Atomic Habits”. Target: 2 chapters today.',
        isCompleted: false,
      },
      {
        title: 'Water Plants',
        description: 'Don’t forget the ones on the balcony and near the kitchen window.',
        isCompleted: true,
      },
      {
        title: 'Prepare Breakfast for Tomorrow',
        description: 'Boil eggs, soak oats, chop fruits, and keep the blender ready for a morning smoothie.',
        isCompleted: false,
      
        }
  ]);

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
            <button className='lhs-container-btn'>+ Add Todo</button>
          </div>
          <div className='rhs-container'>
            <h1 className='rhs-container-heading'></h1>
            <div className='todos-container'>{todo}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TodosPage;
