import { IModalProps } from "@/app/interfaces/interface";

 const DeletePopUp: React.FC<IModalProps> = ({ item, onClose, onUpdate }) =>  {
   
    
    const handleSubmit = (e: any) => {
        e.preventDefault();
        onUpdate(item);
        onClose()
      };

  return (
    <div className="flex h-full flex-col items-center justify-center py-4 md:px-2 bg-opacity-50 bg-slate-600  w-full">
      <div className="flex flex-col items-start flex-wrap mb-4 p-2 w-80 h-40 bg-white border border-gray-300 rounded-3xl">
        <button
          className="text-2xl mb-5"
          onClick={onClose}
          aria-label="Close"
        >
          X
        </button>
       <p className="mb-5">
        Do you really want delete {item?.title}
       </p>
        <button
          className="p-2 bg-red-500 hover:bg-violet-300 border border-gray-300 rounded-3xl"
          onClick={handleSubmit}
          aria-label="Add Todo"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default DeletePopUp
