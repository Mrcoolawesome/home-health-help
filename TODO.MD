When we get back, we need to make the /set-password/hospice and /set-password/marketer paths only available once to them upon their first setup, and then never again
 - Currently anybody can view these routes if they're just logged in as any user I think, meaning any user can make themseves a marketer or hospice users, so yeah we need to fix that.

Also, we need to connect RESEND to our project so we can properly send emails and stuff.

# NOTE: TO MAKE AN ADMIN USER THAT INVITES HOSPICES YOU HAVE TO MANUALLY MAKE IT THROUGH SUPABASE BY MAKING A NEW USER THROUGH THE USER UI AND THEN ADDING THEIR ID TO THE ADMIN ID COLUMN!!
