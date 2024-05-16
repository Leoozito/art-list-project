import SideBar from "@/components/Sidebar";
import AlertDialog from "@/components/Dialogues/AlertDialog";
import Playlist from "./playlist/page";

export default function Home() {
  return (
    <main className="mt-40 flex flex-row max-w-full justify-center items-center">
        <SideBar/>
        <Playlist/>
    </main>
  );
}
