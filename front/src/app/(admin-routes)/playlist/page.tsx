import SideBar from "@/components/Sidebar";
import AlertDialog from "@/components/Dialogues/AlertDialog";
import Playlist from ".";

export default function Home() {
  return (
    <>
      <SideBar/>
      <main className="ml-72 mr-10 mt-32 flex flex-row justify-center items-center">
          
          <Playlist/>
      </main>
    </>
  );
}
