"use client";

import { cn } from "@/lib/utils";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Copy({
  value,
  copyText,
  trackEvent,
  align = "left",
}: {
  value: string;
  copyText: string;
  trackEvent?: {
    fn: TrackEventFunction;
    event_name:
      | "Badge ID"
      | "dApp ID"
      | "API Key"
      | "XP Token Address"
      | "Credit Token Address"
      | "Public Key";
  };
  align?: "left" | "right";
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
    <div
      className={cn("flex space-x-2 flex-1 hover:cursor-pointer", {
        "justify-end": align === "right",
      })}
      onClick={handleCopy}
    >
      {isCopied ? (
        <CheckIcon className="w-4 h-4" />
      ) : (
        <CopyIcon className="w-4 h-4" />
      )}
    </div>
  );
}
