import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";

const TeamInvitePopup = ({ isOpen, onClose, onSendInvites }) => {
  const [emailInput, setEmailInput] = useState("");
  const [emails, setEmails] = useState([]);
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const email = emailInput.trim();
      if (email) {
        if (validateEmail(email)) {
          if (!emails.includes(email)) {
            setEmails([...emails, email]);
            setEmailInput("");
            setError("");
          } else {
            setError("Email already added");
          }
        } else {
          setError("Please enter a valid email address");
        }
      }
    }
  };

  const handleRemoveEmail = (emailToRemove) => {
    setEmails(emails.filter((email) => email !== emailToRemove));
  };

  const handleSend = () => {
    if (emails.length > 0) {
      onSendInvites(emails);
      setEmails([]);
      setEmailInput("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite Team Members</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[44px]">
              {emails.map((email) => (
                <div
                  key={email}
                  className="flex items-center gap-1 bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-sm"
                >
                  <span>{email}</span>
                  <button
                    onClick={() => handleRemoveEmail(email)}
                    className="hover:text-purple-900"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              <Input
                type="email"
                placeholder="Enter email addresses"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 min-w-[120px] border-0 focus-visible:ring-0"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <p className="text-sm text-muted-foreground">
              Press Enter or comma to add email addresses
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSend}
            disabled={emails.length === 0}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Send Invites
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TeamInvitePopup;
