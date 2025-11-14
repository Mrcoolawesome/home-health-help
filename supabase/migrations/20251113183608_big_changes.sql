drop policy "Anon and auth can insert" on "public"."users_doctors";

drop policy "Auth can select" on "public"."users_doctors";

drop policy "Anon and auth can insert" on "public"."users_hh";

revoke delete on table "public"."users_doctors" from "anon";

revoke insert on table "public"."users_doctors" from "anon";

revoke references on table "public"."users_doctors" from "anon";

revoke select on table "public"."users_doctors" from "anon";

revoke trigger on table "public"."users_doctors" from "anon";

revoke truncate on table "public"."users_doctors" from "anon";

revoke update on table "public"."users_doctors" from "anon";

revoke delete on table "public"."users_doctors" from "authenticated";

revoke insert on table "public"."users_doctors" from "authenticated";

revoke references on table "public"."users_doctors" from "authenticated";

revoke select on table "public"."users_doctors" from "authenticated";

revoke trigger on table "public"."users_doctors" from "authenticated";

revoke truncate on table "public"."users_doctors" from "authenticated";

revoke update on table "public"."users_doctors" from "authenticated";

revoke delete on table "public"."users_doctors" from "service_role";

revoke insert on table "public"."users_doctors" from "service_role";

revoke references on table "public"."users_doctors" from "service_role";

revoke select on table "public"."users_doctors" from "service_role";

revoke trigger on table "public"."users_doctors" from "service_role";

revoke truncate on table "public"."users_doctors" from "service_role";

revoke update on table "public"."users_doctors" from "service_role";

revoke delete on table "public"."users_hh" from "anon";

revoke insert on table "public"."users_hh" from "anon";

revoke references on table "public"."users_hh" from "anon";

revoke select on table "public"."users_hh" from "anon";

revoke trigger on table "public"."users_hh" from "anon";

revoke truncate on table "public"."users_hh" from "anon";

revoke update on table "public"."users_hh" from "anon";

revoke delete on table "public"."users_hh" from "authenticated";

revoke insert on table "public"."users_hh" from "authenticated";

revoke references on table "public"."users_hh" from "authenticated";

revoke select on table "public"."users_hh" from "authenticated";

revoke trigger on table "public"."users_hh" from "authenticated";

revoke truncate on table "public"."users_hh" from "authenticated";

revoke update on table "public"."users_hh" from "authenticated";

revoke delete on table "public"."users_hh" from "service_role";

revoke insert on table "public"."users_hh" from "service_role";

revoke references on table "public"."users_hh" from "service_role";

revoke select on table "public"."users_hh" from "service_role";

revoke trigger on table "public"."users_hh" from "service_role";

revoke truncate on table "public"."users_hh" from "service_role";

revoke update on table "public"."users_hh" from "service_role";

alter table "public"."users_doctors" drop constraint "users_doctors_id_fkey";

alter table "public"."users_doctors" drop constraint "users_doctors_name_key";

alter table "public"."users_hh" drop constraint "users_hh_company_key";

alter table "public"."users_hh" drop constraint "users_hh_id_fkey";

alter table "public"."users_hh" drop constraint "users_hh_name_key";

alter table "public"."users_doctors" drop constraint "users_doctors_pkey";

alter table "public"."users_hh" drop constraint "users_hh_pkey";

drop index if exists "public"."idx_doctors_county";

drop index if exists "public"."users_doctors_name_key";

drop index if exists "public"."users_doctors_pkey";

drop index if exists "public"."users_hh_company_key";

drop index if exists "public"."users_hh_name_key";

drop index if exists "public"."users_hh_pkey";

drop table "public"."users_doctors";

drop table "public"."users_hh";


  create table "public"."users_hospice" (
    "id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "name" text not null,
    "company" text not null
      );


alter table "public"."users_hospice" enable row level security;


  create table "public"."users_marketer" (
    "created_at" timestamp with time zone not null default now(),
    "name" text not null,
    "id" uuid not null default gen_random_uuid()
      );


alter table "public"."users_marketer" enable row level security;

CREATE UNIQUE INDEX users_hh_company_key ON public.users_hospice USING btree (company);

CREATE UNIQUE INDEX users_hh_name_key ON public.users_hospice USING btree (name);

CREATE UNIQUE INDEX users_hh_pkey ON public.users_hospice USING btree (id);

alter table "public"."users_hospice" add constraint "users_hh_pkey" PRIMARY KEY using index "users_hh_pkey";

alter table "public"."users_hospice" add constraint "users_hh_company_key" UNIQUE using index "users_hh_company_key";

alter table "public"."users_hospice" add constraint "users_hh_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."users_hospice" validate constraint "users_hh_id_fkey";

alter table "public"."users_hospice" add constraint "users_hh_name_key" UNIQUE using index "users_hh_name_key";

alter table "public"."users_marketer" add constraint "users_marketer_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."users_marketer" validate constraint "users_marketer_id_fkey";

grant delete on table "public"."users_hospice" to "anon";

grant insert on table "public"."users_hospice" to "anon";

grant references on table "public"."users_hospice" to "anon";

grant select on table "public"."users_hospice" to "anon";

grant trigger on table "public"."users_hospice" to "anon";

grant truncate on table "public"."users_hospice" to "anon";

grant update on table "public"."users_hospice" to "anon";

grant delete on table "public"."users_hospice" to "authenticated";

grant insert on table "public"."users_hospice" to "authenticated";

grant references on table "public"."users_hospice" to "authenticated";

grant select on table "public"."users_hospice" to "authenticated";

grant trigger on table "public"."users_hospice" to "authenticated";

grant truncate on table "public"."users_hospice" to "authenticated";

grant update on table "public"."users_hospice" to "authenticated";

grant delete on table "public"."users_hospice" to "service_role";

grant insert on table "public"."users_hospice" to "service_role";

grant references on table "public"."users_hospice" to "service_role";

grant select on table "public"."users_hospice" to "service_role";

grant trigger on table "public"."users_hospice" to "service_role";

grant truncate on table "public"."users_hospice" to "service_role";

grant update on table "public"."users_hospice" to "service_role";

grant delete on table "public"."users_marketer" to "anon";

grant insert on table "public"."users_marketer" to "anon";

grant references on table "public"."users_marketer" to "anon";

grant select on table "public"."users_marketer" to "anon";

grant trigger on table "public"."users_marketer" to "anon";

grant truncate on table "public"."users_marketer" to "anon";

grant update on table "public"."users_marketer" to "anon";

grant delete on table "public"."users_marketer" to "authenticated";

grant insert on table "public"."users_marketer" to "authenticated";

grant references on table "public"."users_marketer" to "authenticated";

grant select on table "public"."users_marketer" to "authenticated";

grant trigger on table "public"."users_marketer" to "authenticated";

grant truncate on table "public"."users_marketer" to "authenticated";

grant update on table "public"."users_marketer" to "authenticated";

grant delete on table "public"."users_marketer" to "postgres";

grant insert on table "public"."users_marketer" to "postgres";

grant references on table "public"."users_marketer" to "postgres";

grant select on table "public"."users_marketer" to "postgres";

grant trigger on table "public"."users_marketer" to "postgres";

grant truncate on table "public"."users_marketer" to "postgres";

grant update on table "public"."users_marketer" to "postgres";

grant delete on table "public"."users_marketer" to "service_role";

grant insert on table "public"."users_marketer" to "service_role";

grant references on table "public"."users_marketer" to "service_role";

grant select on table "public"."users_marketer" to "service_role";

grant trigger on table "public"."users_marketer" to "service_role";

grant truncate on table "public"."users_marketer" to "service_role";

grant update on table "public"."users_marketer" to "service_role";


  create policy "Anon and auth can insert"
  on "public"."users_hospice"
  as permissive
  for insert
  to anon, authenticated
with check (true);



  create policy "Auth can update marketers"
  on "public"."users_marketer"
  as permissive
  for update
  to authenticated
using (true)
with check (true);



  create policy "Authed can make new users"
  on "public"."users_marketer"
  as permissive
  for insert
  to authenticated
with check (true);



