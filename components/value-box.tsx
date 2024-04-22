"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ValueBox({
  value,
  copyText,
  basic,
}: {
  value: string;
  copyText?: string;
  basic?: boolean;
}) {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => setIsCopied(false), 5000);
    }
  }, [isCopied]);

  return (
    <div className="flex space-x-2 flex-1">
      <div
        className={cn(
          "flex h-10 w-full rounded-md  bg-background px-3 py-2 text-sm",
          { "border border-input": !basic }
        )}
      >
        {value}
      </div>
      {copyText && (
        <Button
          className={cn({
            "bg-green-500 hover:bg-green-500": isCopied,
          })}
          onClick={() => {
            setIsCopied(true);
            toast(copyText);
          }}
        >
          {isCopied ? (
            <CheckIcon className="w-4 h-4" />
          ) : (
            <CopyIcon className="w-4 h-4" />
          )}
        </Button>
      )}
    </div>
  );
}
