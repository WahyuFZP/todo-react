import type { Todo } from '../types/types';

type Props = {
    todo: Todo;
    onToggleComplete: (id: number) => void;
    onDelete: (id: number) => void;
    onUpdate: (id: number) => void;
}

export default function Todoitems({ todo, onToggleComplete, onDelete, onUpdate }: Props) {
    return (
        <div className="flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
            <button
                onClick={() => onToggleComplete(todo.id)}
                className="flex flex-1 items-start gap-3 text-left"
            >
                <span
                    className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition ${
                        todo.completed
                            ? "border-emerald-500 bg-emerald-500 text-white"
                            : "border-slate-300 bg-white text-transparent"
                    }`}
                >
                    ✓
                </span>

                <span className="flex-1">
                    <span
                        className={`block text-base font-semibold ${
                            todo.completed
                                ? "text-slate-400 line-through decoration-2"
                                : "text-slate-800"
                        }`}
                    >
                        {todo.title}
                    </span>

                    <span
                        className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-bold tracking-wide ${
                            todo.completed
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-amber-100 text-amber-700"
                        }`}
                    >
                        {todo.completed ? "Sudah selesai" : "Belum selesai"}
                    </span>
                </span>
            </button>

            <div className="flex gap-2 sm:justify-end">
                <button
                    onClick={() => onUpdate(todo.id)}
                    className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(todo.id)}
                    className="rounded-xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-600"
                >
                    Delete
                </button>
            </div>
        </div>
    )
}
