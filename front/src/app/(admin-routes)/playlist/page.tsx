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
    if (session) {
      setUserId(session?.user?.id)
      setUserRole(session?.user?.role)
      console.log("LOGADO",session)
    } else {
      console.log("NÃO LOGADO",session)
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
