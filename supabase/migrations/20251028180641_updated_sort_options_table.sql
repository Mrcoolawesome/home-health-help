alter table "public"."measure_codes" drop constraint "measure_codes_real_desc_key";

drop index if exists "public"."measure_codes_real_desc_key";


  create table "public"."sort_options" (
    "id" uuid not null default gen_random_uuid(),
    "measure_code" text not null,
    "description" text
      );


alter table "public"."sort_options" enable row level security;

CREATE UNIQUE INDEX sort_options_pkey ON public.sort_options USING btree (id);

alter table "public"."sort_options" add constraint "sort_options_pkey" PRIMARY KEY using index "sort_options_pkey";

grant delete on table "public"."sort_options" to "anon";

grant insert on table "public"."sort_options" to "anon";

grant references on table "public"."sort_options" to "anon";

grant select on table "public"."sort_options" to "anon";

grant trigger on table "public"."sort_options" to "anon";

grant truncate on table "public"."sort_options" to "anon";

grant update on table "public"."sort_options" to "anon";

grant delete on table "public"."sort_options" to "authenticated";

grant insert on table "public"."sort_options" to "authenticated";

grant references on table "public"."sort_options" to "authenticated";

grant select on table "public"."sort_options" to "authenticated";

grant trigger on table "public"."sort_options" to "authenticated";

grant truncate on table "public"."sort_options" to "authenticated";

grant update on table "public"."sort_options" to "authenticated";

grant delete on table "public"."sort_options" to "service_role";

grant insert on table "public"."sort_options" to "service_role";

grant references on table "public"."sort_options" to "service_role";

grant select on table "public"."sort_options" to "service_role";

grant trigger on table "public"."sort_options" to "service_role";

grant truncate on table "public"."sort_options" to "service_role";

grant update on table "public"."sort_options" to "service_role";


  create policy "Auth and anon can select"
  on "public"."sort_options"
  as permissive
  for select
  to anon, authenticated
using (true);



