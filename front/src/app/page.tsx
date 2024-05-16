import SideBar from "@/components/Sidebar";
import Login from "./auth/sign-in/page";
import SignUp from "./auth/sign-up/page";
import AlertDialog from "@/components/Dialogues/AlertDialog";

export default function Home() {
  return (
    <main className="mt-20 flex flex-row min-h-screen max-w-full justify-center items-center">
        <SideBar/>
    </main>
  );
}
