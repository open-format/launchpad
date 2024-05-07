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
  label,
  description,
  isLoading,
}: {
  value: string;
  copyText?: string;
  basic?: boolean;
  label?: string;
  description?: string;
  isLoading?: boolean;
}) {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => setIsCopied(false), 5000);
    }
  }, [isCopied]);

  function handleCopy() {
    try {
      navigator.clipboard.writeText(value);
      setIsCopied(true);
      toast.success(copyText);
    } catch (e) {
      toast.error("error copying text. Please try again");
    }
  }

  return (
    <div className="flex space-x-2 flex-1 w-full">
      <div className="w-full space-y-1">
        {label && <h3>{label}</h3>}
        {description && (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        )}

        <div
          className={cn(
            "flex h-10 w-full rounded-md bg-background px-3 py-2 text-sm",
            {
              "border border-input": !basic,
              "bg-primary/20 animate-pulse": isLoading,
            }
          )}
        >
          {value && <p className="truncate">{value}</p>}
        </div>
      </div>

      {copyText && (
        <Button
          className={cn(
            {
              "bg-green-500 hover:bg-green-500": isCopied,
            },
            "self-end"
          )}
          onClick={handleCopy}
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
