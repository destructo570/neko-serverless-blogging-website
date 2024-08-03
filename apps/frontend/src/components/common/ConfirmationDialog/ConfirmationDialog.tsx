import React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ConfirmationDialog(props) {
  const { heading, confirmation_text, onConfirmClick, children, trigger_component} = props;
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger_component}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{heading}</DialogTitle>
          <DialogDescription>{confirmation_text}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>
          <Button type="button" onClick={onConfirmClick}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
