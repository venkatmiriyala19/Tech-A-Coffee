import { SignInButton } from "@clerk/nextjs";

export default function Authentication() {
  return (
    <>
      <img
        src="/assets/images/tech-a-coffee-logo.png"
        alt="Logo"
        className="h-5 m-10 ml-12 mb-2"
      />
      <div className="flex items-center ">
        <div className="text-center mr-auto ml-7">
          <img src="/assets/images/Safe_3D.png" alt="Safe" />
        </div>
        <div className="text-center border-dashed border-2 rounded-md p-10 ml-auto mr-20">
          <h1 className="font-headerBold text-[3rem] mb-3">Authentication</h1>
          <p className="font-light text-[#EEF3F9] text-opacity-50 text-center">
            Sign in easily with your preferred account to get started!
          </p>
          <div className="flex justify-center">
            <SignInButton>
              <div className="font-headerBold bg-[#EEF3F9] text-[#001B2E] text-[1.5rem] pb-3 pt-2 px-6 rounded-md mt-5 flex items-center cursor-pointer">
                <img
                  src="/assets/images/lock.png"
                  alt="Login"
                  className="w-7 h-7 mr-2"
                />
                Login
              </div>
            </SignInButton>
          </div>
        </div>
      </div>
    </>
  );
}
