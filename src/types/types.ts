export type Todo = {
    id: number;
    title: string;
    completed: boolean;
}

export type CreateTodoDTO = {
    id: number;
    title: string;
    completed?: boolean;
}

export type UpdateTodoDTO = {
    id: number;
    title?: string;
    completed?: boolean;
}