import PollOption from "./PollOption";

export default function QuickPoll() {
  return (
    <div className="bg-[#EEF3F9] w-[40vw] rounded p-3 border-2 border-black">
      <h3 className="text-[#1D3F58] font-bold text-sm">Question</h3>
      <div className="flex items-center justify-between">
        <h1 className="text-[#001B2E] font-bold w-11/12 text-lg ml-2">
          Which JavaScript framework do you prefer for building web
          applications? What excites you most about the future of Artificial
          Intelligence?
        </h1>
        <img
          src={"/assets/images/bookmark.png"}
          alt="Bookmark"
          className="w-7 mr-5"
        />
      </div>
      <hr
        className="mt-10 mb-5 border-t-2 mx-2 w-11/12"
        style={{ borderColor: "rgba(83, 118, 146, 0.5)" }}
      />
      <PollOption />
    </div>
  );
}
