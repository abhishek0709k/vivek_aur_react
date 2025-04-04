import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeTodo, updateTodo } from '../features/todo/todoSlice'

const Todos = () => {
  const todos = useSelector(state => state.todos)
  const useNewDispatch = useDispatch();
  const [newValue, setNewValue] = useState("")
  // console.log(newValue)
  return (
    <>
        <p>Todos</p>
        <input type="text" placeholder='updated value' value={newValue} onChange={(e)=> setNewValue(e.target.value)}/>
        {
            todos.map((todo)=>(
                <li key={todo.id}> 
                    { todo.myTodo }
                    <button onClick={() => useNewDispatch(removeTodo(todo.id))}>X</button>
                    <button onClick={() => useNewDispatch(updateTodo({id: todo.id, myTodo: newValue}))}>Update todo</button>
                </li>
            ))
        }
    </>
  )
}

export default Todos