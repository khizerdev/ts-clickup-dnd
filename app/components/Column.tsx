import { Todo, TypedColumn } from "@/typings";
import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Task from "./Task";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useBoardStore } from "@/store/BoardStore";
import { useModalStore } from "@/store/AddModalStore";

type Props = {
  id: TypedColumn;
  todos: Todo[];
  index: number;
};

const idToColumnText: {
  [key in TypedColumn]: string;
} = {
  todo: "To Do",
  inprogress: "In Progress",
  done: "Done",
  qa: "In QA",
};

function Column({ id, index, todos }: Props) {
  const [searchString, setNewTaskType] = useBoardStore((state) => [
    state.searchString,
    state.setNewTaskType,
  ]);

  const [openModal] = useModalStore((state) => [
    state.openModal,
    state.closeModal,
  ]);

  const handleAddTodo = () => {
    setNewTaskType(id);
    openModal();
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={index.toString()} type="card">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`p-2 rounded-2xl shadow-sm ${
                  snapshot.isDraggingOver ? "bg-green-200/50" : "bg-white/50"
                }`}
              >
                <h2 className="flex justify-between font-bold text-xl mb-2">
                  {idToColumnText[id]}
                  <span className="text-gray-500 bg-gray-200 rounded-full px-2 py-1 text-sm font-normal">
                    {!searchString
                      ? todos.length
                      : todos.filter((todo) =>
                          todo.type
                            .toLowerCase()
                            .includes(searchString.toLowerCase())
                        ).length}
                  </span>
                </h2>

                <div className="space-y-2">
                  {todos.map((todo, index) => {
                    if (
                        searchString &&
                        !todo.type
                          .toLowerCase()
                          .includes(searchString.toLowerCase())
                      )
                        return null;
                    return (
                      <Draggable
                        key={todo.$id}
                        draggableId={todo.$id}
                        index={index}
                      >
                        {(provided) => (
                          <Task
                            todo={todo}
                            index={index}
                            id={id}
                            innerRef={provided.innerRef}
                            draggableProps={provided.draggableProps}
                            dragHandleProps={provided.dragHandleProps}
                          ></Task>
                        )}
                      </Draggable>
                    );
                  })}

                  {provided.placeholder}

                
                    <div
                        className="group mb-1.5 flex cursor-pointer items-center rounded p-2 hover:bg-gray-300 ltr:pl-2 rtl:pr-2"
                        onClick={handleAddTodo}
                    >
                        <svg
                        className="h-4 w-4 text-gray-500 group-hover:text-gray-700"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                        />
                        </svg>
                        <span className="block text-sm text-gray-500 group-hover:text-gray-700 ltr:ml-2 rtl:mr-2 ml-2">
                        Add task
                        </span>
                    </div>
                
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}

export default Column;
