import { EType, StatisticTypeProps } from "@/interface";

export default function Categories({ todoCountsByType }: StatisticTypeProps) {
  return (
    <div className="flex flex-col w-60 px-4 py-4 md:px-4">
      <h2>Categories</h2>
      <div className="flex flex-row justify-between w-full px-3 py-4 md:px-2 ">
        <div className="w-8 h-8 bg-red-700 border-solid rounded-sm"></div>
        <h2 className="text-center">
          Play ({todoCountsByType[EType.PLAY] || 0})
        </h2>
      </div>
      <div className="flex flex-row justify-between w-full px-3 py-4 md:px-2 ">
        <div className="w-8 h-8 bg-orange-700 border-solid rounded-sm"></div>
        <h2 className="text-center">
          Work ({todoCountsByType[EType.WORK] || 0})
        </h2>
      </div>
      <div className="flex flex-row justify-between w-full px-3 py-4 md:px-2 ">
        <div className="w-8 h-8 bg-green-700 border-solid rounded-sm"></div>
        <h2 className="text-center">
          Study ({todoCountsByType[EType.STUDY] || 0})
        </h2>
      </div>
    </div>
  );
}
