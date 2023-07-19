import { ID, databases, storage } from '@/appwrite';
import { Board, Column, TypedColumn, Todo } from '@/typings';
import getTodosGroupedByColumn from '@/utils/getTodosGroupedByColumn';
import { create } from 'zustand'

interface BoardState {
    board: Board;
    getBoard: () => void,
    deleteTask: (taskIndex: number, todoId: Todo, id: TypedColumn) => void,
    setBoardState: (board: Board) => void,
}

export const useBoardStore = create<BoardState>((set) => ({
    board: {
        columns: new Map<TypedColumn, Column>(),
    },
    getBoard: async () => {
        const board = await getTodosGroupedByColumn();
        set({board})
    },
    deleteTask: async (taskIndex, todo, id) => {
        const newColumns = new Map(get().board.columns)

        // delete todoId from newColumns
        // do it in an optimistic way
        newColumns.get(id)?.todos.splice(taskIndex, 1)

        set({ board: { columns: newColumns } })

        if (todo.image) {
            await storage.deleteFile(todo.image.bucketId, todo.image.fileId)
        }

        await databases.deleteDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
            todo.$id,
        )
    },

    setBoardState: (board) => set({ board }),
}))