"use client";

import { useRouter } from "next/navigation";
import NavBar from "./commonComponents/navBar";

export default function Home() {

  const router = useRouter();

  const handelNavigation = (value: string) => {

    if (value === "userlogin") {  
      router.push("/userlogin");
    }

    if (value === "adminlogin") {
      router.push("/adminlogin");
    }
  };

  return (
    <>
      <NavBar />

      <div className="flex flex-col justify-center items-center gap-5 h-screen">

        <button
          className="px-4 py-2 w-[200px] bg-blue-500 text-white rounded"
          onClick={() => handelNavigation("userlogin")}
        >
          User Login
        </button>

        <button
          className="px-4 py-2 w-[200px] bg-green-500 text-white rounded"
          onClick={() => handelNavigation("adminlogin")}
        >
          Admin Login
        </button>

      </div>
    </>
  );
}
