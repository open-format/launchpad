"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateAppForm } from "@/forms/create-app-form";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreateAppPage() {
  const router = useRouter();

  async function onCreateApp(data: any) {
    alert(JSON.stringify(data));
    return router.push("/home/apps");
  }

  return (
    <div className="flex flex-col items-center space-y-5 w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Create dApp</CardTitle>
          <CardDescription>
            Create a decentralised App.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateAppForm onSubmit={onCreateApp} />
        </CardContent>
      </Card>
      <Link href="/onboarding/create-app">Skip</Link>
    </div>
  );
}
