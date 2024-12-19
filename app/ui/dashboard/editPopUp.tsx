import { EStatus, EType, IModalProps } from "@/interface";
import { useEffect, useState } from "react";

 const EditPopUp: React.FC<IModalProps> = ({ item, onClose, onUpdate }) =>  {
    const [formData, setFormData] = useState({
      id: 0,
      title: '',
      date: '',
      from: 0,
      to: 0,
      status: EStatus.CANCEL,
      type: EType.PLAY
      });
    
      useEffect(() => {
        if (item) {
          setFormData({ id: item.id, title: item.title, date: item.date, from: item.from, to: item.to , type: item.type, status: item.status});
        }
      }, [item]);
    
      const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = (e: any) => {
        e.preventDefault();
        onUpdate(formData);
      };
  return (
    <div className="flex h-full flex-col py-4 md:px-2 bg-slate-400 col-span-1">
      <div className="flex flex-col items-start flex-wrap mb-4 float-right">
        <button
          className="text-2xl mb-5"
          onClick={onClose}
          aria-label="Close"
        >
          X
        </button>
        <textarea
          className="w-60 border-solid border-black border-4 rounded-md p-2 text-center content-center mb-5"
          value={formData.title}
          name="title"
          onChange={handleChange} 
          placeholder="Enter your todo..."
          aria-label="Todo title"
        />
        <input
          type="date"
          name="date"
          id="date"
          className="w-60 border-solid border-black border-4 rounded-md p-2 text-center content-center mb-5"
          value={formData.date}
          onChange={handleChange} 
        />
        <textarea
          className="w-60 border-solid border-black border-4 rounded-md p-2 text-center content-center mb-5"
          value={formData.from}
          name="from"
          onChange={handleChange} 
          placeholder="Enter start hour"
        />
        <textarea
          className="w-60 border-solid border-black border-4 rounded-md p-2 text-center content-center mb-5"
          value={formData.to}
          name="to"
          onChange={handleChange} 
          placeholder="Enter end hour"
        />
        <button
          className="p-4 ml-4 bg-blue-500 hover:bg-violet-300 border border-gray-300 rounded-3xl"
          onClick={handleSubmit}
          aria-label="Add Todo"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default EditPopUp
