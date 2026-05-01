import type { Todo } from '../types/types';
import { useState, useEffect } from 'react';
import TodoItem from '../components/TodoItems';
import { getTodos, createTodo, updateTodo, deleteTodo } from "../services/todoServices";



export default function Home() {
    // State
    const [todos, setTodos] = useState<Todo[]>(() => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
});
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAddTodo = async () => {
        if(input.trim() === "") return;

        // JSONPlaceholder (dan beberapa mock API lain) sering mengembalikan `id` yang sama
        // untuk setiap POST. Kalau `id` duplikat, toggle/update berbasis id akan ikut kena semua.
        const clientId = Date.now();

        try {
            const newTodo = await createTodo({
                id: clientId,
                title: input,
                completed: false,
            });
            setTodos((prev) => [...prev, { ...newTodo, id: clientId }]);
            setInput("");
        } catch (err) {
            setError("Gagal menambahkan todo");
        }
    };

    const handleTodoToggleComplete = async (id: number) => {
        setTodos(todos.map(todo => 
            todo.id === id
            ? {...todo, completed: !todo.completed}
            : todo
        ))
    }

    const handleTodoUpdate = async(id: number) => {
        const newTitle = prompt("Enter new title");
        if(!newTitle) return;

        const target = todos.find(todo => todo.id === id);
        if(!target) return;

        try  {
            const updatedTodo = await updateTodo({
                id: id,
                title: newTitle,
                completed: target.completed,
            })
            setTodos((prev) => prev.map(todo => 
                todo.id === id
                ? {...todo, title: updatedTodo.title}
                : todo
            ))
        } catch (error) {
            setError("Gagal mengupdate todo");
        }
    }

    const handleTodoDelete = async (id: number) => {
        try {
            await deleteTodo(id);
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (error) {
            setError("Gagal menghapus todo");
        }
    }

    useEffect(() => {
       if(todos.length > 0) return
        const fetchTodos = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getTodos();
                setTodos(data);
            } catch (err) {
                setError("Gagal mengambil data todos");
            } finally {
                setLoading(false);
            }
        }; 
        fetchTodos();
    }, [todos]);

    useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);


    const completedCount = todos.filter((todo) => todo.completed).length;
    const pendingCount = todos.length - completedCount;

    return (
        <main className="min-h-screen px-4 py-10 sm:px-6">
            <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
                <section className="overflow-hidden rounded-4xl border border-white/70 bg-white/85 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.10)] backdrop-blur sm:p-8">
                    <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                        <div className="max-w-xl">
                            <p className="mb-3 inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-bold tracking-[0.24em] text-sky-700 uppercase">
                                Daily Planner
                            </p>
                            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                                Todo List React Belajar
                            </h1>
                            <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
                                Catat tugas penting, tandai yang sudah selesai, dan rapikan aktivitas harian Anda
                                dalam satu halaman yang sederhana.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:min-w-56">
                            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Total</p>
                                <p className="mt-2 text-2xl font-bold text-slate-900">{todos.length}</p>
                            </div>
                            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-left">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-500">Done</p>
                                <p className="mt-2 text-2xl font-bold text-emerald-700">{completedCount}</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-[28px] border border-slate-200 bg-slate-50/80 p-4 sm:p-5">
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleAddTodo();
                                    }
                                }}
                                placeholder="Tulis tugas baru di sini..."
                                className="h-14 flex-1 rounded-2xl border border-slate-200 bg-white px-4 text-slate-700 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                            />
                            <button
                                onClick={handleAddTodo}
                                className="h-14 rounded-2xl bg-slate-900 px-6 font-semibold text-white transition hover:bg-slate-800 active:scale-[0.99]"
                            >
                                Add Todo
                            </button>
                        </div>
                    </div>
                </section>

                <section className="rounded-4xl border border-white/70 bg-white/80 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:p-6">
                    <div className="mb-5 flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">Daftar Tugas</h2>
                            <p className="mt-1 text-sm text-slate-500">
                                {pendingCount} tugas belum selesai
                            </p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {todos.length === 0 ? (
                            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
                                <p className="text-lg font-semibold text-slate-700">Belum ada tugas</p>
                                <p className="mt-2 text-sm text-slate-500">
                                    Tambahkan todo pertama Anda untuk mulai mengatur pekerjaan hari ini.
                                </p>
                            </div>
                        ) : (
                            todos.map(todo => (
                                <TodoItem
                                    key={todo.id}
                                    todo={todo}
                                    onToggleComplete={handleTodoToggleComplete}
                                    onDelete={handleTodoDelete}
                                    onUpdate={handleTodoUpdate}
                                />
                            ))
                        )}
                    </div>
                </section>
            </div>
        </main>
    )
}
