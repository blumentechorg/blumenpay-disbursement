import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import Pending from "@/public/icons/cards/pending";

export default function Card() {
  return (
    <div className="bg-white shadow-lg rounded-lg font-light ">
      {/* Title and Logo */}
      <div className="flex items-center  border-b min-w-full py-4 px-5 space-x-2 ">
        <div className="text-gray-700 text-sm ">Pending Disbursements</div>
        <div className="text-blue-500 text-xl ">
          <Pending />
        </div>
      </div>

      {/* Amount and Arrow */}
      <div className="py-4 space-y-8">
        <div className=" flex items-center px-5 space-x-2">
          <div className="text-2xl font-bold text-gray-800">$1,000</div>
          <FaArrowTrendUp className=" text-xl" />
        </div>

        {/* Alert with Percentage */}
        <div className=" text-sm px-5 rounded flex items-center space-x-2 ">
          <div className=" bg-[#0052CC] text-white p-1 rounded-lg text-xs">
            +15.6%
          </div>
          <div>Last 7 Days</div>
        </div>
      </div>
    </div>
  );
}
