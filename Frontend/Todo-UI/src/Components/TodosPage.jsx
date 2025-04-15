import React from 'react'

function TodosPage(){
    let todos = [{
        title: 'Going to GYM.',
        desciption: 'Leg workout today',
        isCompleted:  true
    },
    {
        title: 'Cooking Food',
        desciption: 'Making dinner for 4 people tonight.',
        isCompleted: false
    }]
    let todo = todos.map((element) => {
        return(
            <div className='todo-element'>
                <input type='checkbox' ></input>
                <h2 className='todo-title'>{element.title}</h2>
                <p className="todo-description">{element.desciption}</p>
                <small></small>
            </div>
        )


    })
    return <>
    <div className='todo-page-container'>
        <div className="header">
            <button type='button' className='logout-button' >Logout</button>
            <h1 className='logo-text'>Todo App</h1>
            <p className='into-text'>Hi,  </p>
        </div>
        <div className='todo-content'>
            <div className='lhs-container'>
                <h1 className='lhs-container-heading'>Plan it, track it, conquer it.</h1>
                <p className='lhs-container-description'> Your tasks, simplified with our Todo App!</p>
                <button className='lhs-container-btn'>+ Add Todo</button>
            </div>
            <div className='rhs-container'>
                <h1 className='rhs-container-heading'></h1>
                <div className='todos-container'>
                    {todo}
                </div>
            </div>
        </div>
    </div>
        

    </>
}


export default TodosPage;