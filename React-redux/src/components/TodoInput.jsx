import React, { useState } from 'react'
import { addTodo } from '../features/todo/todoSlice';
import { useDispatch } from 'react-redux';

const TodoInput = () => {
  const [myTodo, setTodo] = useState("");
  const useNewDispatch = useDispatch()
  const handleSubmitTodo = (e)=>{
    e.preventDefault()
    useNewDispatch(addTodo(myTodo))
    setTodo("")
  }
  return (
    <div>
        <form onSubmit={handleSubmitTodo}>
            <input  
                type='text'
                placeholder='Enter the text'
                value={myTodo}
                onChange={(e)=> setTodo(e.target.value)}
            />
        </form>
    </div>
  )
}

export default TodoInput