"use client";
import { EStatus, EType, ITodo } from "@/app/interfaces/interface";
import React, { useState } from "react";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import EditPopUp from "./editPopUp";
import AddPopup from "./addPopup";
import DeletePopUp from "./deletePopup";
import Statistics from "./statistic";
import Categories from "./category";

export function MainPage() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalState, setModalState] = useState<{
    isAddOpen: boolean;
    isEditOpen: boolean;
    isDeleteOpen: boolean;
    selectedTodo: ITodo | null;
  }>({
    isAddOpen: false,
    isEditOpen: false,
    isDeleteOpen: false,
    selectedTodo: null,
  });


  const editTodoStatus = (id: number, status: EStatus) => {
    setTodos(prevTodos =>
      prevTodos.map(todo => (todo.id === id ? { ...todo, status } : todo))
    );
  };


  const editTodoType = (id: number, type: EType) => {
    setTodos(prevTodos =>
      prevTodos.map(todo => (todo.id === id ? { ...todo, type } : todo))
    );
  };


  const addTodo = (newTodo: ITodo) => {
    setTodos(prevTodos => [...prevTodos, newTodo]);
    setModalState(prevState => ({ ...prevState, isAddOpen: false }));
  };

  const updateTodo = (updatedTodo: any) => {
    setTodos(prevTodos =>
      prevTodos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
    setModalState(prevState => ({ ...prevState, isEditOpen: false }));
  };


  const deleteTodo = (todoToDelete: any) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoToDelete.id));
    setModalState(prevState => ({ ...prevState, isDeleteOpen: false }));
  };

 
  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const countTodosByStatus = () => {
    return Object.values(EStatus).reduce((acc, status) => {
      acc[status] = todos.filter(todo => todo.status === status).length;
      return acc;
    }, {} as Record<EStatus, number>);
  };

  const countTodosByType = () => {
    return Object.values(EType).reduce((acc, type) => {
      acc[type] = todos.filter(todo => todo.type === type).length;
      return acc;
    }, {} as Record<EType, number>);
  };

  const getTodoStatusClass = (status: EStatus ) => {
    const statusClasses = {
      [EStatus.NOT_START]: "bg-gray-500",
      [EStatus.ON_GOING]: "bg-yellow-200",
      [EStatus.DONE]: "bg-green-200",
      [EStatus.CANCEL]: "bg-red-200",
    };
    return statusClasses[status] || "";
  };

  return (
    <div className="h-full w-full grid grid-flow-col grid-cols-7">
      <div className="h-full w-full flex flex-col justify-start col-span-6">
        <div className="flex flex-row w-fit">
          <button
            onClick={() => setModalState(prevState => ({ ...prevState, isAddOpen: true, isEditOpen: false }))}
            className="w-40 h-10 text-center m-8 border-solid border-blue-400 border-4 rounded-md text-blue-400"
          >
            New Task
          </button>
          <div className="m-8">
            <input
              type="text"
              placeholder="Search Todos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-60 p-2 border border-gray-700 rounded-md"
            />
          </div>
        </div>

        <div className="w-fit absolute left-0 top-2/4">
          <Statistics todoCountsByStatus={countTodosByStatus()} />
        </div>
        <div className="w-fit absolute left-0 top-40">
          <Categories todoCountsByType={countTodosByType()} />
        </div>

        <table className="flex flex-col m-4 w-11/12 flex-wrap items-center border rounded-md border-gray-300">
          <thead className="w-full">
            <tr className="w-full p-4 mb-4 border border-gray-300 rounded items-center grid grid-flow-row grid-cols-9">
              <th className="col-span-1">Id</th>
              <th className="col-span-1">Date</th>
              <th className="col-span-1">Title</th>
              <th className="col-span-1">From</th>
              <th className="col-span-1">To</th>
              <th className="col-span-1">Type</th>
              <th className="col-span-1">Status</th>
              <th className="col-span-2"></th>
            </tr>
          </thead>
          <tbody className="w-full border border-gray-300">
            {filteredTodos.length > 0 ? (
              filteredTodos.map((todo) => (
                <tr
                  key={todo.id}
                  className={`grid grid-flow-row grid-cols-9 mb-4 p-4 border border-gray-300 rounded w-full items-center ${getTodoStatusClass(todo.status)}`}
                >
                  <td className="text-xl text-center col-span-1">{todo.id + 1}</td>
                  <td className="text-xl text-center col-span-1">{todo.date}</td>
                  <td className="text-xl text-center col-span-1">{todo.title}</td>
                  <td className="text-xl text-center col-span-1">{todo.from}</td>
                  <td className="text-xl text-center col-span-1">{todo.to}</td>
                  <td className="text-xl text-center col-span-1">
                    <select
                      value={todo.type}
                      onChange={(e) => editTodoType(todo.id, e.target.value as EType)}
                      className="w-28 text-center border border-gray-300 rounded-3xl h-10"
                    >
                      {Object.values(EType).map((type) => (
                        <option key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="text-xl text-center col-span-1">
                    <select
                      value={todo.status}
                      onChange={(e) => editTodoStatus(todo.id, e.target.value as EStatus)}
                      className="w-28 text-center border border-gray-300 rounded-3xl h-10"
                    >
                      {Object.values(EStatus).map((status) => (
                        <option key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="col-span-1">
                    <button
                      className="p-4 ml-4 bg-yellow-500 hover:bg-red-300 border border-gray-300 rounded-3xl w-20 flex items-center justify-center text-white"
                      onClick={() => setModalState({ ...modalState, isEditOpen: true, selectedTodo: todo })}
                      aria-label={`Edit todo "${todo.title}"`}
                    >
                      <FaPen />
                    </button>
                  </td>
                  <td className="col-span-1">
                    <button
                      className="p-4 ml-4 bg-red-500 hover:bg-red-300 border border-gray-300 rounded-3xl w-20 flex items-center justify-center text-white"
                      onClick={() => setModalState({ ...modalState, isDeleteOpen: true, selectedTodo: todo })}
                      aria-label={`Delete todo "${todo.title}"`}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="text-center py-4">
                  No todos found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>


      {modalState.isAddOpen && (
        <div className="flex justify-end col-span-1">
          <AddPopup id={todos.length} onClose={() => setModalState({ ...modalState, isAddOpen: false })} onUpdate={addTodo} />
        </div>
      )}
      {modalState.isEditOpen && modalState.selectedTodo && (
        <div className="flex justify-end col-span-1">
          <EditPopUp item={modalState.selectedTodo} onClose={() => setModalState({ ...modalState, isEditOpen: false })} onUpdate={updateTodo} />
        </div>
      )}
      {modalState.isDeleteOpen && modalState.selectedTodo && (
        <div className="flex justify-center items-center absolute h-full w-4/6">
          <DeletePopUp item={modalState.selectedTodo} onClose={() => setModalState({ ...modalState, isDeleteOpen: false })} onUpdate={deleteTodo} />
        </div>
      )}
    </div>
  );
}
