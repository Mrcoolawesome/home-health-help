
  create policy "Auth can select"
  on "public"."users_admin"
  as permissive
  for select
  to authenticated
using (true);



