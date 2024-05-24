import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { LoginForm } from "./login-form";

export default async function LoginPage() {
  return (
    <div className="flex flex-col h-screen p-2">
      <header className="flex items-center justify-center w-full gap-2 font-semibold p-4">
        <Image
          className="rounded-md"
          src="https://avatars.githubusercontent.com/u/121942809?s=200&v=4"
          height={25}
          width={25}
          alt="hi"
        />
        <span>OPENFORMAT</span>
        <Badge>BETA</Badge>
      </header>
      <div className="max-w-prose mx-auto flex flex-col items-between justify-between h-full">
        <LoginForm />
      </div>
    </div>
  );
}
