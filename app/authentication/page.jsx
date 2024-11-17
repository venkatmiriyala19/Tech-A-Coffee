import Signup from "@/components/Signup";
export default function Authentication() {
  return (
    <div className="flex items-center">
      <div>
        <img src="/assets/images/Safe_3D.png" alt="Safe" />
      </div>
      <div>
        <h1 className="font-headerBold text-[3rem] mb-3">Authentication</h1>
        <p className="font-light text-[#EEF3F9] text-opacity-50 text-center">
          Sign in easily with your preferred account to get started!
        </p>
        <div>
          <img src="/assets/images/google.png" alt="Google" />
          Google
        </div>
      </div>
    </div>
  );
}
