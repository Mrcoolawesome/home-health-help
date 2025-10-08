create table "public"."users_doctors" (
    "id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "name" text not null,
    "specialization" text not null,
    "referral_status" boolean not null
);


alter table "public"."users_doctors" enable row level security;

create table "public"."users_hh" (
    "id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "name" text not null,
    "company" text not null
);


alter table "public"."users_hh" enable row level security;

CREATE UNIQUE INDEX users_doctors_name_key ON public.users_doctors USING btree (name);

CREATE UNIQUE INDEX users_doctors_pkey ON public.users_doctors USING btree (id);

CREATE UNIQUE INDEX users_hh_company_key ON public.users_hh USING btree (company);

CREATE UNIQUE INDEX users_hh_name_key ON public.users_hh USING btree (name);

CREATE UNIQUE INDEX users_hh_pkey ON public.users_hh USING btree (id);

alter table "public"."users_doctors" add constraint "users_doctors_pkey" PRIMARY KEY using index "users_doctors_pkey";

alter table "public"."users_hh" add constraint "users_hh_pkey" PRIMARY KEY using index "users_hh_pkey";

alter table "public"."users_doctors" add constraint "users_doctors_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."users_doctors" validate constraint "users_doctors_id_fkey";

alter table "public"."users_doctors" add constraint "users_doctors_name_key" UNIQUE using index "users_doctors_name_key";

alter table "public"."users_hh" add constraint "users_hh_company_key" UNIQUE using index "users_hh_company_key";

alter table "public"."users_hh" add constraint "users_hh_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."users_hh" validate constraint "users_hh_id_fkey";

alter table "public"."users_hh" add constraint "users_hh_name_key" UNIQUE using index "users_hh_name_key";

grant delete on table "public"."users_doctors" to "anon";

grant insert on table "public"."users_doctors" to "anon";

grant references on table "public"."users_doctors" to "anon";

grant select on table "public"."users_doctors" to "anon";

grant trigger on table "public"."users_doctors" to "anon";

grant truncate on table "public"."users_doctors" to "anon";

grant update on table "public"."users_doctors" to "anon";

grant delete on table "public"."users_doctors" to "authenticated";

grant insert on table "public"."users_doctors" to "authenticated";

grant references on table "public"."users_doctors" to "authenticated";

grant select on table "public"."users_doctors" to "authenticated";

grant trigger on table "public"."users_doctors" to "authenticated";

grant truncate on table "public"."users_doctors" to "authenticated";

grant update on table "public"."users_doctors" to "authenticated";

grant delete on table "public"."users_doctors" to "service_role";

grant insert on table "public"."users_doctors" to "service_role";

grant references on table "public"."users_doctors" to "service_role";

grant select on table "public"."users_doctors" to "service_role";

grant trigger on table "public"."users_doctors" to "service_role";

grant truncate on table "public"."users_doctors" to "service_role";

grant update on table "public"."users_doctors" to "service_role";

grant delete on table "public"."users_hh" to "anon";

grant insert on table "public"."users_hh" to "anon";

grant references on table "public"."users_hh" to "anon";

grant select on table "public"."users_hh" to "anon";

grant trigger on table "public"."users_hh" to "anon";

grant truncate on table "public"."users_hh" to "anon";

grant update on table "public"."users_hh" to "anon";

grant delete on table "public"."users_hh" to "authenticated";

grant insert on table "public"."users_hh" to "authenticated";

grant references on table "public"."users_hh" to "authenticated";

grant select on table "public"."users_hh" to "authenticated";

grant trigger on table "public"."users_hh" to "authenticated";

grant truncate on table "public"."users_hh" to "authenticated";

grant update on table "public"."users_hh" to "authenticated";

grant delete on table "public"."users_hh" to "service_role";

grant insert on table "public"."users_hh" to "service_role";

grant references on table "public"."users_hh" to "service_role";

grant select on table "public"."users_hh" to "service_role";

grant trigger on table "public"."users_hh" to "service_role";

grant truncate on table "public"."users_hh" to "service_role";

grant update on table "public"."users_hh" to "service_role";

create policy "Anon and auth can insert"
on "public"."users_doctors"
as permissive
for insert
to anon, authenticated
with check (true);


create policy "Anon and auth can insert"
on "public"."users_hh"
as permissive
for insert
to anon, authenticated
with check (true);



