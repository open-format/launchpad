import getUserSession from "@/lib/getUserSession";
import { redirect } from "next/navigation";
import { RegisterForm } from "./register-form";

export default async function RegisterPage() {
  const {
    data: { user },
  } = await getUserSession();

  if (user) {
    return redirect("/home/apps");
  }
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div>
            <h1 className="text-3xl font-bold">Register</h1>
            <h2 className="text-sm font-medium text-muted-foreground">
              Create a new account
            </h2>
          </div>
          <RegisterForm />
        </div>
      </div>
      <div className="hidden bg-muted lg:flex h-screen items-end border-l ">
        <div className="flex items-center space-x-2 m-3 justify-center p-5">
          <blockquote className="space-y-2 text-right">
            <p className="text-lg">
              "Using OPENFORMAT to power our first Web3 enabled
              project took all of the hassle out of dealing with smart
              contracts and got us up and running much quicker"
            </p>
            <footer className="text-sm font-semibold">
              Jack - Developer
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
