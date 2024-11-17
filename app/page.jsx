"use client";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/authentication");
  };
  return (
    <>
      <nav className="flex items-center">
        <img
          src="/assets/images/tech-a-coffee-logo.png"
          alt="Logo"
          className="h-5 m-10 ml-12"
        />
        <button
          className="font-headerMedium border border-[#EEF3F9] px-5 py-3 cursor-pointer ml-auto mr-10"
          onClick={handleRedirect}
        >
          Get Started
        </button>
      </nav>
      <div className="flex items-center">
        <div className="ml-12 ">
          <h1 className="font-headerBold text-[2.8rem] mb-4">
            Grab your daily dose of tech
          </h1>
          <p className="font-light text-xl leading-relaxed w-[50vw] text-[#EEF3F9] text-opacity-50 mb-8">
            Fuel your curiosity with the latest in tech, from groundbreaking
            innovations to gadget reviews. At Tech-a-coffee, we blend knowledge
            and insights to keep you ahead in the fast-paced world of
            technology. Sip, scroll, and stay updated!
          </p>
          <button
            className="font-headerMedium border border-[#EEF3F9] px-5 py-3 cursor-pointer ml-auto mr-10"
            onClick={handleRedirect}
          >
            Get Started
          </button>
        </div>
        <div>
          <img
            src="/assets/images/Rocket_3D.png"
            alt="Rocket"
            className="w-4/5 ml-auto"
          />
        </div>
      </div>
    </>
  );
}
