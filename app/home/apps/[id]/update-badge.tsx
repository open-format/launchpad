import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UpdateBadgeForm } from "@/forms/update-badge-form";
import { EditIcon } from "lucide-react";
import { useState } from "react";

export default function UpdateBadgeDialog({
  badge,
  metadata,
  trackEvent,
}: {
  badge: Badge;
  trackEvent: TrackEventFunction;
  metadata: BadgeMetadata;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function toggle() {
    setIsOpen((t) => !t);
  }

  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogTrigger>
        <EditIcon className="h-6 w-6 hover:text-muted-foreground" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Badge</DialogTitle>
          <DialogDescription>
            Update the type, description, or image of your badge. This
            will update the badge onchain.
          </DialogDescription>
        </DialogHeader>
        <UpdateBadgeForm
          badge={badge}
          metadata={metadata}
          closeDialog={toggle}
          trackEvent={trackEvent}
        />
      </DialogContent>
    </Dialog>
  );
}
