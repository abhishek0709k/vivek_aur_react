import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: []
}

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action)=>{
            const todo = {
                id: nanoid(),
                myTodo: action.payload,
                completed: false
            }
            state.todos.push(todo)
        },
        removeTodo: (state, action)=>{
            state.todos = state.todos.filter((eachTodo)=> eachTodo.id !== action.payload);
        },
        updateTodo: (state, action)=>{
            state.todos = state.todos.map((eachTodo)=> {
                if(eachTodo.id === action.payload.id){
                    return {
                        ...eachTodo, myTodo: action.payload.myTodo
                    }
                }
                console.log()
                return eachTodo;
            })
            
        }
    }
})

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;

export const todoReducer = todoSlice.reducer;