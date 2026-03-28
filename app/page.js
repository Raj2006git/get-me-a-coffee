"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <>
      <div className="flex flex-col justify-center items-center text-white h-[44vh] gap-4">
        <div className="font-bold text-5xl flex items-center gap-4 justify-center">Get Me A Coffee <img className="h-16" src="icons8-coffee-94.png" alt="" /></div>
        <p>A Crowdfunding platform for Creators. Get Funded by your Fans and Followers. Start Now!</p>
        <div>
          <button type="button" onClick={()=>{router.push(session ? "/dashboard" : "/login")}} className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer">Start Now</button>
          <button type="button" onClick={()=>router.push("/about")} className="cursor-pointer text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button>
        </div>
      </div>
      <div className="bg-white h-1 opacity-20">
      </div>
      <div className="text-white flex flex-col justify-center items-center gap-6 p-5">
        <h1 className="text-3xl font-bold">Your Fans can Buy you a Coffee</h1>
        <div className="flex gap-5 justify-evenly items-center">
          <div className="item flex flex-col justify-center items-center gap-1 px-3">
            <img src="icons8-office-48.png" alt="office" className="bg-amber-200 rounded-full p-1"/>
            <p className="font-bold text-base">Fans Want To Help</p>
            <p className="text-sm">Your Fans are available to Support You</p>
          </div>
          <div className="item flex flex-col justify-center items-center gap-1 px-3">
            <img src="icons8-coin-48.png" alt="coin" className="bg-amber-200 rounded-full p-1"/>
            <p className="font-bold text-base">Fans Want To Contribute</p>
            <p className="text-sm">Your Fans are willing to Contribute Financially</p>
          </div>
          <div className="item flex flex-col justify-center items-center gap-1 px-3">
            <img src="icons8-user-groups-48.png" alt="group" className="bg-amber-200 rounded-full p-1"/>
            <p className="font-bold text-base">Fans Want To Collaborate</p>
            <p className="text-sm">Your Fans are ready to Collaborate with you</p>
          </div>
        </div>
      </div>
    </>
  );
}
