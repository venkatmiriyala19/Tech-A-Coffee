export default function News({ title, date, img }) {
  return (
    <div className="w-[25vw] rounded-xl overflow-hidden shadow-lg mb-10 ">
      <img src={img} alt="Placeholder" className="w-full h-40 object-cover" />
      <div className="w-[100%] bg-white px-3 py-5 ">
        <p className="text-[#537692] text-opacity-80 text-sm font-bold">
          {date || "No Date"}
        </p>
        <div className="flex items-center">
          <h1 className="text-black font-bold w-11/12">{title}</h1>
          <img
            src={"/assets/images/bookmark.png"}
            alt="Bookmark"
            className="w-7"
          />
        </div>
      </div>
    </div>
  );
}
