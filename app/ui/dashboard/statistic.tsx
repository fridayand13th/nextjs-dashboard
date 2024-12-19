import { EStatus, StatisticStatusProps } from "@/interface";

export default function Statistics( { todoCountsByStatus }: StatisticStatusProps) {
    return (
      <div className="flex flex-col w-60 px-4 py-4 md:px-4">
        <h2>Todo tasks</h2>
        <div className="flex flex-row justify-between w-full px-3 py-4 md:px-2 ">
          <div className="w-8 h-8 bg-red-300 border-solid rounded-sm"></div>
          <h2 className="text-center">Cancle ({todoCountsByStatus[EStatus.CANCEL] || 0})</h2>
        </div>
        <div className="flex flex-row justify-between w-full px-3 py-4 md:px-2 ">
          <div className="w-8 h-8 bg-yellow-300 border-solid rounded-sm"></div>
          <h2 className="text-center">On going ({todoCountsByStatus[EStatus.ON_GOING] || 0})</h2>
        </div>
        <div className="flex flex-row justify-between w-full px-3 py-4 md:px-2 ">
          <div className="w-8 h-8 bg-green-300 border-solid rounded-sm"></div>
          <h2 className="text-center">Done ({todoCountsByStatus[EStatus.DONE] || 0})</h2>
        </div>
        <div className="flex flex-row justify-between w-full px-3 py-4 md:px-2 ">
          <div className="w-8 h-8 bg-gray-500 border-solid rounded-sm"></div>
          <h2 className="text-center">Not start ({todoCountsByStatus[EStatus.NOT_START] || 0})</h2>
        </div>
      </div>
    );
  }
  