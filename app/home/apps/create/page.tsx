"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateAppForm } from "@/forms/create-app-form";
import { useRouter } from "next/navigation";

export default function CreateAppPage() {
  const router = useRouter();

  async function onCreateApp(data) {
    alert(JSON.stringify(data));
    return router.push("/home/apps/123");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create dApp</CardTitle>
        <CardDescription>Create a decentralised App.</CardDescription>
      </CardHeader>
      <CardContent>
        <CreateAppForm onSubmit={onCreateApp} />
      </CardContent>
    </Card>
  );
}
