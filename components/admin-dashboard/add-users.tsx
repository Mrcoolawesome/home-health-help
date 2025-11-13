import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";

/**
 * I'm gonna make this so that there's a button right below the boxes to add users, where you can click to make a new box to add a new user.
 * Once you click the box, a new form box is created, and they can just keep doing this for now.
 * When they're ready to send the emails, they click the submit button to send the invitation emails.
 * @returns 
 */
export function AddUsers() {
  /* im going to set the id of each input box to be 0-indexed, and then use that id as the location in the array 
  to put in the email for that specific box */
  const [emails, setEmails] = useState([""]);

  const updateEmail = (index: number, value: string) => {
    setEmails(prev => prev.map((email, i) => i === index ? value : email)); // all of this just to replace a specific element at a specific index smh
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // don't want it to submit the form like normal when the submit button is pressed

  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        {/* We always start with at least one email box, so that's why this one is hardcoded here. */}
        <Input
          id="email-0"
          type="email"
          placeholder="m@example.com"
          required
          value={emails[0]}
          onChange={(e) => updateEmail(0, e.target.value)}
        />

        {emails.map((email, index) => (
          <Input
            id={`email-${index}`}
            type="email"
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
    </div>
  )
}