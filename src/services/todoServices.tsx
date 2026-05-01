import type { CreateTodoDTO, Todo, UpdateTodoDTO } from '../types/types';
import { TodoArraySchema, CreateTodoSchema, UpdateTodoSchema, TodoSchema } from '../schemas/todo.schemas';

const API_URL = "https://jsonplaceholder.typicode.com";



export const getTodos = async (): Promise<Todo[]> => {
    try{
        const res = await fetch(`${API_URL}/todos?_limit=5`)

        if(!res.ok) {
            throw new Error("Gagal mengambil data todos");
        }

       const json = await res.json();
       const data = TodoArraySchema.parse(json);
       return data;
    } catch (error) {
        console.error("Error fetching todos:", error)
        throw error
    }
}

export const createTodo = async (todoData: CreateTodoDTO): Promise<Todo> => {
    try{
        const validated = CreateTodoSchema.parse(todoData);

        const payload = {
            ...validated,
            completed: validated.completed ?? false
        }

        const res = await fetch(`${API_URL}/todos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        if(!res.ok) {
            throw new Error("Gagal membuat todo");
        }

       const json = await res.json();

       const data = TodoSchema.parse(json);

       return data;
    } catch (error) {
        console.error("Error creating todo:", error)
        throw error
            }
    }

    export const updateTodo = async (todoData: UpdateTodoDTO): Promise<Todo> => {
        try {
            const validated = UpdateTodoSchema.parse(todoData);
            const res = await fetch(`${API_URL}/todos/${validated.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(validated)
            });
            if(!res.ok) {
                throw new Error("Gagal mengupdate todo");
            }
            const json = await res.json();
            
            const data = TodoSchema.parse(json);
            
            return data;
        } catch (error) {
            console.error("Error updating todo:", error)
            throw error
        }
    }

    export const deleteTodo = async (id: number): Promise<void> => {
        try {
            const res = await fetch(`${API_URL}/todos/${id}`, {
                method: "DELETE"
            });
            if(!res.ok) {
                throw new Error("Gagal menghapus todo");
            }
        } catch (error) {
            console.error("Error deleting todo:", error)
            throw error
        }
    }