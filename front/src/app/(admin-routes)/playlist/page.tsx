"use client"
import SideBar from "@/components/Sidebar";
import Playlist from ".";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session, status } = useSession()
  const [userId, setUserId] = useState<number>()
  const [userRole , setUserRole] = useState<string>()

  useEffect(() => {
    if (session != undefined && session != null) {
      setUserId(session?.user?.id)
      setUserRole(session?.user?.role)
      console.log(session)
    } else {
      console.log(session)
    }
  }, [session])

  return (
    <>
      <SideBar/>
      <main className="md:ml-72 mr-10 mt-32 flex flex-row justify-center items-center">       
          <Playlist 
            datasUser={{
              userId: userId,
              userRole: userRole
            }}
          />
      </main>
    </>
  );
}
