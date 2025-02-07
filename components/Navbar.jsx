"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const { user, isLoaded } = useUser();
  const pathname = usePathname();

  const navItems = [
    { name: "Home", route: "/feed" },
    { name: "Latest Tech", route: "/latest-tech" },
    { name: "Quick Polls", route: "/quick-polls" },
    { name: "Tech Gadgets", route: "/tech-gadgets" },
  ];

  return (
    <div className="flex items-center justify-between mt-5 pl-5 mb-12">
      <img
        src="/assets/images/tech-a-coffee-logo.png"
        alt="Logo"
        className="h-3"
      />
      <div className="border-2 border-[#EEF3F9] px-[3rem] rounded-3xl">
        <ul className="font-headerMedium flex space-x-10 transition-all duration-300 ease-in-out">
          {navItems.map((item) => (
            <Link href={item.route} key={item.route}>
              <li
                className={`cursor-pointer pt-2 pb-3  ${
                  pathname === item.route ? "bg-[#EEf3f9] text-black px-2" : ""
                } transition-all duration-300 ease-in-out`}
              >
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="flex items-center">
        {user && (
          <span className="mr-4 text-lg font-headerMedium text-[#EEF3F9]">
            {user.username || user.firstName || "User"}
          </span>
        )}
        {isLoaded ? (
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "h-[3rem] w-[3rem] mr-5",
              },
            }}
          />
        ) : (
          <img
            src="/assets/images/placeholder-avatar.png"
            alt="Loading..."
            className="h-[3rem] w-[3rem] rounded-full mr-5 animate-pulse"
          />
        )}
      </div>
    </div>
  );
}
