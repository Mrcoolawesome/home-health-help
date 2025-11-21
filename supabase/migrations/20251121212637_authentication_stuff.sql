alter table "public"."users_hospice" drop constraint "users_hh_name_key";

drop index if exists "public"."users_hh_name_key";


  create table "public"."users_admin" (
    "created_at" timestamp with time zone not null default now(),
    "id" uuid not null default gen_random_uuid(),
    "name" text not null
      );


alter table "public"."users_admin" enable row level security;

alter table "public"."users_hospice" drop column "name";

alter table "public"."users_hospice" add column "ccn" text not null;

alter table "public"."users_hospice" add column "phone_num" text not null;

alter table "public"."users_hospice" add column "place_id" text not null;

CREATE UNIQUE INDEX users_admin_id_key ON public.users_admin USING btree (id);

CREATE UNIQUE INDEX users_admin_pkey ON public.users_admin USING btree (id);

CREATE UNIQUE INDEX users_hospice_ccn_key ON public.users_hospice USING btree (ccn);

CREATE UNIQUE INDEX users_hospice_place_id_key ON public.users_hospice USING btree (place_id);

alter table "public"."users_admin" add constraint "users_admin_pkey" PRIMARY KEY using index "users_admin_pkey";

alter table "public"."users_admin" add constraint "users_admin_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."users_admin" validate constraint "users_admin_id_fkey";

alter table "public"."users_admin" add constraint "users_admin_id_key" UNIQUE using index "users_admin_id_key";

alter table "public"."users_hospice" add constraint "users_hospice_ccn_key" UNIQUE using index "users_hospice_ccn_key";

alter table "public"."users_hospice" add constraint "users_hospice_place_id_key" UNIQUE using index "users_hospice_place_id_key";

grant delete on table "public"."users_admin" to "anon";

grant insert on table "public"."users_admin" to "anon";

grant references on table "public"."users_admin" to "anon";

grant select on table "public"."users_admin" to "anon";

grant trigger on table "public"."users_admin" to "anon";

grant truncate on table "public"."users_admin" to "anon";

grant update on table "public"."users_admin" to "anon";

grant delete on table "public"."users_admin" to "authenticated";

grant insert on table "public"."users_admin" to "authenticated";

grant references on table "public"."users_admin" to "authenticated";

grant select on table "public"."users_admin" to "authenticated";

grant trigger on table "public"."users_admin" to "authenticated";

grant truncate on table "public"."users_admin" to "authenticated";

grant update on table "public"."users_admin" to "authenticated";

grant delete on table "public"."users_admin" to "postgres";

grant insert on table "public"."users_admin" to "postgres";

grant references on table "public"."users_admin" to "postgres";

grant select on table "public"."users_admin" to "postgres";

grant trigger on table "public"."users_admin" to "postgres";

grant truncate on table "public"."users_admin" to "postgres";

grant update on table "public"."users_admin" to "postgres";

grant delete on table "public"."users_admin" to "service_role";

grant insert on table "public"."users_admin" to "service_role";

grant references on table "public"."users_admin" to "service_role";

grant select on table "public"."users_admin" to "service_role";

grant trigger on table "public"."users_admin" to "service_role";

grant truncate on table "public"."users_admin" to "service_role";

grant update on table "public"."users_admin" to "service_role";


  create policy "auth insert"
  on "public"."users_hospice"
  as permissive
  for insert
  to authenticated
with check (true);



