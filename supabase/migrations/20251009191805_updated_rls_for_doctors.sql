create policy "Auth can select"
on "public"."users_doctors"
as permissive
for select
to authenticated
using (true);



