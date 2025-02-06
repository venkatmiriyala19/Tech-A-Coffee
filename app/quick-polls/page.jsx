import CreatePoll from "@/components/CreatePoll";
import QuickPoll from "@/components/QuickPoll";
import Microphone from "@/public/assets/images/Microphone_3D.png";
export default function QuickPolls() {
  return (
    <div className="ml-5">
      <div className="mx-6 mb-[4rem] flex justify-between items-center">
        <div>
          <h1 className="font-headerBold text-[1.7rem] mb-5 ">Create a Poll</h1>
          <CreatePoll />
        </div>
        <img
          src="/assets/images/Microphone_3D.png"
          alt="LoudSpeaker"
          className="mr-10 h-full"
        />
      </div>
      <div className="border-t-2 border-[#eef3f9] pt-5 border-dashed mx-6 my-8">
        <h1 className="font-headerBold text-[1.7rem] mb-5 ">Quick Polls</h1>
        <QuickPoll />
      </div>
    </div>
  );
}
