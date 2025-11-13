"use client"

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import InviteUsers from "../../lib/invite-users/invite-users";

/**
 * I'm gonna make this so that there's a button right below the boxes to add users, where you can click to make a new box to add a new user.
 * Once you click the box, a new form box is created, and they can just keep doing this for now.
 * When they're ready to send the emails, they click the submit button to send the invitation emails.
 * @returns 
 */
export function AddUsers() {
  /* im going to set the id of each input box to be 0-indexed, and then use that id as the location in the array 
  to put in the email for that specific box */
  // This is actually pretty cool because since I'm initalizing 'emails' to have [""] by defualt,
  // this means that it knows its type is string[] and also gives it a single empty default entry
  // so there's a blank entry by default which is what I also want. 
  const [emails, setEmails] = useState([""]); 

  const updateEmail = (index: number, value: string) => {
    setEmails(prev => prev.map((email, i) => i === index ? value : email)); // all of this just to replace a specific element at a specific index smh
  }

  return (
    <div>
      <form action={InviteUsers}>
        {/* We always start with at least one email box, so that's why we have 'emails' set to have 
            one empty string by default.
        */}

        {emails.map((email, index) => (
          <Input
            key={`${index}`}
            id={`email-${index}`}
            type="email"
            name="email"
            placeholder="m@example.com"
            required
            value={email}
            onChange={(e) => updateEmail(index, e.target.value)}
          />
          
        ))}
        
        <Button>
          Send Email Invitations
        </Button>
      </form>
      {/* Button that makes a new empty element in the 'emails' array, and then 
          increases the email entry counter by 1
      */}
      <Button onClick={() => {
        setEmails(prev => [...prev, ""]);
      }}>
        Add Another Email
      </Button>

      {/* Button that removes the last email box. */}
      <Button onClick={() => {
        setEmails((prev) => {
          if (prev.length <= 1) return prev; // keep at least one input
          return prev.slice(0, -1); // otherwise remove the last element
        });
      }}>
        Remove Last Email
      </Button>
    </div>
  )
}