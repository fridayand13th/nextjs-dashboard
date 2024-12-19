import { EStatus, EType, IAddModalProps, ITodo } from "@/app/interfaces/interface";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useRef, useState, useEffect } from "react";

const AddPopup: React.FC<IAddModalProps> = ({ id, onClose, onUpdate }) => {
  const time: number = new Date().getHours();
  const [todoTitle, setTodoTitle] = useState<string>("");
  const [todoStatus, setTodoStatus] = useState<EStatus>(EStatus.NOT_START);
  const [todoDate, setTodoDate] = useState<string>("");
  const [todoStart, setTodoStart] = useState<number>(time);
  const [todoEnd, setTodoEnd] = useState<number>(24);
  const [todoType, setTodoType] = useState<EType>(EType.STUDY);
  const [error, setError] = useState<string | null>(null);
  const todoIdRef = useRef<number>(id);


  const validateForm = () => {
    if (!todoTitle.trim()) {
      setError("Todo title is required.");
      return false;
    }
    if (!todoDate) {
      setError("Todo date is required.");
      return false;
    }
    if (todoStart >= todoEnd) {
      setError("Start hour must be less than end hour.");
      return false;
    }
    setError(null); 
    return true;
  };

  const addTodo = () => {
    if (validateForm()) {
      const newTodo: ITodo = {
        id: todoIdRef.current++,
        title: todoTitle,
        status: todoStatus,
        date: todoDate,
        from: todoStart,
        to: todoEnd,
        type: todoType,
      };

      onUpdate(newTodo);
      resetForm();
    }
  };

  const resetForm = () => {
    setTodoTitle("");
    setTodoStatus(EStatus.NOT_START);
    setTodoDate("");
    setTodoStart(time);
    setTodoEnd(24);
    setTodoType(EType.STUDY);
  };

  
  useEffect(() => {
    if (error) {
      validateForm(); 
    }
  }, [todoTitle, todoDate, todoStart, todoEnd, todoType, error]);

  return (
    <div className="flex h-full flex-col py-4 md:px-2 bg-slate-400 col-span-1">
      <div className="flex flex-col items-start flex-wrap mb-4 float-right">
        <button
          className="text-2xl mb-5"
          onClick={onClose}
          aria-label="Close modal"
        >
          X
        </button>
        
        <textarea
          className="w-60 border-solid border-black border-4 rounded-md p-2 text-center content-center mb-5"
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
          placeholder="Enter your todo..."
          aria-label="Todo title"
        />
        
        <input
          type="date"
          name="date"
          id="date"
          className="w-60 border-solid border-black border-4 rounded-md p-2 text-center content-center mb-5"
          value={todoDate}
          onChange={(e) => setTodoDate(e.target.value)}
          aria-label="Todo date"
        />
        
        <input
          type="number"
          name="startHour"
          className="w-60 border-solid border-black border-4 rounded-md p-2 text-center content-center mb-5"
          value={todoStart}
          onChange={(e) => setTodoStart(Number(e.target.value))}
          placeholder="Start hour"
          aria-label="Start hour"
        />
        
        <input
          type="number"
          name="endHour"
          className="w-60 border-solid border-black border-4 rounded-md p-2 text-center content-center mb-5"
          value={todoEnd}
          onChange={(e) => setTodoEnd(Number(e.target.value))}
          placeholder="End hour"
          aria-label="End hour"
        />
        
        <select
          id="type1"
          name="type1"
          value={todoType}
          onChange={(e) => setTodoType(e.target.value as EType)}
          className="w-60 border-solid border-black border-4 rounded-md p-2 text-center content-center mb-5"
          aria-label="Select todo type"
        >
          {Object.values(EType).map((types) => (
            <option key={types} value={types}>
              {types.charAt(0).toUpperCase() + types.slice(1)}
            </option>
          ))}
        </select>
        
        <button
          className="p-4 ml-4 bg-blue-500 hover:bg-violet-300 border border-gray-300 rounded-3xl"
          onClick={addTodo}
          disabled={!!error}
          aria-label="Add Todo"
        >
          Add
        </button>

        {error && (
          <div className="mt-2 text-red-500">
            <ExclamationCircleIcon className="h-5 w-5 inline mr-2" />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddPopup;
