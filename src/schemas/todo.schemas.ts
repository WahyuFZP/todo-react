import {z} from "zod";

export const TodoSchema = z.object({
    id: z.number(),
    title: z.string(),
    completed: z.boolean(),
})

export const CreateTodoSchema = z.object({
    id: z.number(),
    title: z
        .string()
        .min(2, { message: "Title tidak boleh kosong" })
        .max(255, { message: "Title tidak boleh lebih dari 255 karakter" }),
    completed: z.boolean().optional(),
})

export const UpdateTodoSchema = z.object({
    id: z.number(),
    title: z
        .string()
        .min(2, { message: "Title tidak boleh kosong" })
        .max(255, { message: "Title tidak boleh lebih dari 255 karakter" }),
    completed: z.boolean().optional(),
})

export const TodoArraySchema = z.array(TodoSchema);

export type Todo = z.infer<typeof TodoSchema>;