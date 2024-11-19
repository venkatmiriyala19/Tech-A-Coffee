import { FaRegCircle, FaCircle } from "react-icons/fa";

export default function PollOption() {
  return (
    <div className="mx-2 w-11/12 bg-[#B3CDE4] p-4 rounded flex items-center justify-between">
      {/* Left Section: Circle and Option Label */}
      <div className="flex items-center">
        <div className="relative">
          <FaRegCircle
            className="w-full h-full text-[#1D3F58]"
            style={{ fontSize: "1.5rem" }}
          />
          <FaCircle
            className="absolute inset-0 m-auto text-[#1D3F58]"
            style={{ fontSize: "0.9rem", marginTop: "0.35rem" }}
          />
        </div>
        <span className="ml-2 text-[#001B2E] font-medium">Option Label</span>
      </div>
      {/* Right Section: Percentage */}
      <span className="text-[#1D3F58]  font-bold">73%</span>
    </div>
  );
}
