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
  trackEvent,
}: {
  value: string;
  copyText?: string;
  basic?: boolean;
  label?: string;
  description?: string;
  isLoading?: boolean;
  trackEvent?: {
    fn: TrackEventFunction;
    event_name:
      | "Badge ID"
      | "dApp ID"
      | "API Key"
      | "XP Token Address"
      | "Public Key";
  };
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

      if (trackEvent) {
        trackEvent.fn({
          event_name: `${trackEvent.event_name} Copied`,
        });
      }
    } catch (e) {
      toast.error("error copying text. Please try again");
    }
  }

  return (
    <div className="flex space-x-2 flex-1">
      <div className={cn({ "flex-1": !basic }, "space-y-1")}>
        {label && <label>{label}</label>}
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
