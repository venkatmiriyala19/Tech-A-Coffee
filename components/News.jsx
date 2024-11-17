export default function News({ title, date, img, url, width }) {
  return (
    <div className={`w-[${width}] rounded-xl overflow-hidden shadow-lg mb-10 `}>
      <img src={img} alt="Placeholder" className="w-full h-40 object-cover" />
      <div className="w-[100%] bg-white px-3 py-5">
        <p className="text-[#537692] text-opacity-80 text-sm font-bold">
          {date || "No Date"}
        </p>
        <div className="flex items-center">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black font-bold w-11/12 block "
          >
            <h1 className="line-clamp-2">{title}</h1> {/* Limit to 2 lines */}
          </a>
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
