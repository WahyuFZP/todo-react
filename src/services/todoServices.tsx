import type { CreateTodoDTO, Todo, UpdateTodoDTO } from '../types/types';

const API_URL = "https://jsonplaceholder.typicode.com";


export const getTodos = async (): Promise<Todo[]> => {
    try{
        const res = await fetch(`${API_URL}/todos?_limit=5`)

        if(!res.ok) {
            throw new Error("Gagal mengambil data todos");
        }

        const data: Todo[] = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching todos:", error)
        throw error
    }
}

export const createTodo = async (todoData: CreateTodoDTO): Promise<Todo> => {
    try{
        const payload = {
            ...todoData,
            completed: todoData.completed ?? false
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
        const data: Todo = await res.json();
        return data;
    } catch (error) {
        console.error("Error creating todo:", error)
        throw error
            }
    }

    export const updateTodo = async (todoData: UpdateTodoDTO): Promise<Todo> => {
        try {
            const res = await fetch(`${API_URL}/todos/${todoData.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(todoData)
            });
            if(!res.ok) {
                throw new Error("Gagal mengupdate todo");
            }
            const data: Todo = await res.json();
            return data;
        } catch (error) {
            console.error("Error updating todo:", error)
            throw error
        }
    }
