import Login from "./auth/sign-in/page";
import SignUp from "./auth/sign-up/page";

export default function Home() {
  return (
    <main className="flex flex-row min-h-screen max-w-full justify-center items-center">
        <SignUp/>
    </main>
  );
}
