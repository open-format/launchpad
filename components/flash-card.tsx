import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

interface FlashCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}
export default function FlashCard({
  title,
  description,
  children,
}: FlashCardProps) {
  return (
    <Card className="border-destructive">
      <CardHeader>
        <div className="flex space-x-2">
          <AlertTriangle className="text-destructive" />
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter>{children}</CardFooter>
    </Card>
  );
}
