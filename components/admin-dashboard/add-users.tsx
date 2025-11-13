"use client"

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import InviteUsers from "../../lib/invite-users/invite-users";
import { UserPlus, X, Mail, Check, CheckCircle2 } from "lucide-react";

/**
 * Admin dashboard component for inviting users via email.
 * Features:
 * - Toggle mode to show/hide invite form
 * - Dynamic email input fields with animations
 * - Themed to match the website design
 * - Confirmation screen after submission
 */
export function AddUsers() {
  const [emails, setEmails] = useState([""]); 
  const [isInviteMode, setIsInviteMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [invitedCount, setInvitedCount] = useState(0);

  const updateEmail = (index: number, value: string) => {
    setEmails(prev => prev.map((email, i) => i === index ? value : email));
  }

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    const count = emails.length;
    await InviteUsers(formData);
    setIsSubmitting(false);
    // Show confirmation screen
    setInvitedCount(count);
    setShowConfirmation(true);
    setIsInviteMode(false);
    // Reset emails
    setEmails([""]);
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {showConfirmation ? (
        <Card className="border-2 border-good/50 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-20 h-20 bg-good/20 rounded-full flex items-center justify-center animate-in zoom-in duration-700 delay-150">
              <CheckCircle2 className="w-12 h-12 text-good" />
            </div>
            <CardTitle className="text-3xl text-good">Invitations Sent!</CardTitle>
            <CardDescription className="text-base mt-2">
              Successfully sent {invitedCount} invitation email{invitedCount > 1 ? "s" : ""}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4 pb-6">
            <p className="text-foreground-alt">
              The invited users will receive an email with instructions to set up their accounts.
            </p>
            <Button 
              onClick={() => setShowConfirmation(false)}
              className="bg-primary hover:bg-primary/90 text-foreground font-semibold px-8 py-6 text-base"
            >
              Invite More Users
            </Button>
          </CardContent>
        </Card>
      ) : !isInviteMode ? (
        <Card className="border-2 hover:border-primary/50 transition-all duration-300">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
              <UserPlus className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Invite New Users</CardTitle>
            <CardDescription>
              Send invitation emails to new marketers or team members
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center pb-6">
            <Button 
              onClick={() => setIsInviteMode(true)}
              className="bg-primary hover:bg-primary/90 text-foreground font-semibold px-8 py-6 text-lg"
            >
              <UserPlus className="mr-2 w-5 h-5" />
              Start Inviting Users
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-2 border-primary/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Mail className="w-6 h-6 text-primary" />
                  Send Invitations
                </CardTitle>
                <CardDescription className="mt-2">
                  Add email addresses for users you want to invite
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setIsInviteMode(false);
                  setEmails([""]);
                }}
                className="hover:bg-error/10 hover:text-error"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form action={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label className="text-base font-semibold">Email Addresses</Label>
                
                {emails.map((email, index) => (
                  <div
                    key={`email-${index}`}
                    className="animate-in slide-in-from-top-2 fade-in duration-300"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex gap-2 items-center">
                      <div className="flex-1 relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground-alt" />
                        <Input
                          id={`email-${index}`}
                          type="email"
                          name="email"
                          placeholder="user@example.com"
                          required
                          value={email}
                          onChange={(e) => updateEmail(index, e.target.value)}
                          className="pl-10 border-2 focus:border-primary transition-colors"
                        />
                      </div>
                      {emails.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEmails(prev => prev.filter((_, i) => i !== index));
                          }}
                          className="hover:bg-error/10 hover:text-error flex-shrink-0"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEmails(prev => [...prev, ""]);
                  }}
                  className="flex-1 border-2 border-dashed border-primary/50 hover:border-primary hover:bg-primary/10"
                >
                  <UserPlus className="mr-2 w-4 h-4" />
                  Add Another Email
                </Button>
              </div>

              <div className="pt-4 border-t">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-foreground font-semibold py-6 text-base"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-foreground border-t-transparent mr-2" />
                      Sending Invitations...
                    </>
                  ) : (
                    <>
                      <Check className="mr-2 w-5 h-5" />
                      Send {emails.length} Invitation{emails.length > 1 ? "s" : ""}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}