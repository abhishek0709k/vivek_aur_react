import { useEffect, useState } from 'react'
import { TodoProvider } from './context/TodoContext'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'
function App() {
  const [todos, setTodos] = useState([])
  const addTodo = (todo)=>{
    setTodos((prev)=> [{ id: Date.now(), todo: todo, completed: false }, ...prev])
  }
  const updateTodo = ( id, todo )=>{
    setTodos((prev) => ( prev.map((eachTodo) => eachTodo.id == id? {...eachTodo, todo: todo} : eachTodo) ))
  }
  const deleteTodo = (id) => {
    setTodos((prev) => ( prev.filter((singleTodo)=> singleTodo.id !== id)))
  }
  const toggleComplete = (id)=>{
    setTodos((prev) => prev.map((todo)=> todo.id === id? {...todo, completed: true} : todo))
  }
  useEffect(()=>{
    const todos = JSON.parse(localStorage.getItem("todos"))
    if(todos && todos.length > 0){
      setTodos(todos)
    }
  }, [])
  useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])
  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, toggleComplete, deleteTodo}}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            <TodoForm /> 
          </div>
          <div className="flex flex-wrap gap-y-3">
            {
              todos.map((singleTodo)=>(
                <div key={singleTodo.id} className='w-full'>
                  <TodoItem todo={singleTodo} />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
