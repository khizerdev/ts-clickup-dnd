import { databases } from "@/appwrite"
import { Board, Column, Image, TypedColumn } from "@/typings";

const getTodosGroupedByColumn = async () => {
    const data = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID!,
        process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
    )

    const todos = data.documents;

    const columns = todos.reduce((acc, todo) => {
        if (!acc.get(todo.status)) {
            acc.set(todo.status, {
                id: todo.status,
                todos: [],
            })
        }

        acc.get(todo.status)!.todos.push({
            $id: todo.$id,
            $createdAt: todo.$createdAt,
            type: todo.type,
            status: todo.status,
            ...(todo.image && { image: JSON.parse(todo.image) as Image })
        })

        return acc
    }, new Map<TypedColumn, Column>())

    // if columns doesnt have the typedColumns, add them with empty todos
    const columnTypes: TypedColumn[] = ["todo", "inprogress","qa","done"];

    for (const columnType of columnTypes) {
        if (!columns.get(columnType)) {
            columns.set(columnType, {
                id: columnType,
                todos: []
            })
        }
    }

    // sort columns now
    const sortedColumns = new Map(Array.from(columns.entries()).sort((a, b) => (
        columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
    )))

    const board: Board = {
        columns: sortedColumns
    }
    
    return board;
}

export default getTodosGroupedByColumn
