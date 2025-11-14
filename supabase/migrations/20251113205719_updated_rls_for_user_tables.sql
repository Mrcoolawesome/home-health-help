drop policy "Anon and auth can insert" on "public"."users_hospice";

drop policy "Auth can update marketers" on "public"."users_marketer";


  create policy "Authed can select"
  on "public"."users_hospice"
  as permissive
  for select
  to authenticated
using (true);



  create policy "Authed Can Select"
  on "public"."users_marketer"
  as permissive
  for select
  to authenticated
using (true);



