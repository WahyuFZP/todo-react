import type { CreateTodoDTO, Todo, UpdateTodoDTO } from '../types/types';
import { TodoArraySchema, CreateTodoSchema, UpdateTodoSchema, TodoSchema } from '../schemas/todo.schemas';
import { ms } from 'zod/locales';



// fake database sementara sebelum menggunakan API
let todosDB: Todo[] = [
    
]

let nextId = 1;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


export const getTodos = async (): Promise<Todo[]> => {
    
    try{
        await delay(500);
        return [...todosDB];
}   catch (error) {
        console.error("Error fetching todos:", error);
        throw error;
    }
}

export const createTodo = async (todoData: CreateTodoDTO): Promise<Todo> => {
    try{
        const validated = CreateTodoSchema.parse(todoData);
        await delay(500);

        const newTodo: Todo = {
            id: nextId++,
            title: validated.title,
            completed: validated.completed ?? false
        };

        todosDB.push(newTodo);

        return newTodo;
    } catch (error) {
        console.error("Error creating todo:", error);
        throw error;
    }
};

    export const updateTodo = async (todoData: UpdateTodoDTO): Promise<Todo> => {
        try {
            const validated = UpdateTodoSchema.parse(todoData);
            await delay(500);

            const index = todosDB.findIndex(todo => todo.id === validated.id);
            if(index === -1) {
                throw new Error("Todo tidak ditemukan");
            }
            todosDB[index] = { ...todosDB[index], ...validated };
            return todosDB[index];
        } catch (error) {
            console.error("Error updating todo:", error);
            throw error;
        }
    }

    export const deleteTodo = async (id: number): Promise<void> => {
        try {
            await delay(500);
            const index = todosDB.findIndex(todo => todo.id === id);
            if(index === -1) {
                throw new Error("Todo tidak ditemukan");
            }
            todosDB.splice(index, 1);
        } catch (error) {
            console.error("Error deleting todo:", error);
            throw error;
        }
    }
    