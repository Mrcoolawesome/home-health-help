create table "public"."measure_codes" (
    "measure_code" text not null,
    "description" text,
    "measure_name" text,
    "real_desc" text,
    "id" uuid not null default gen_random_uuid()
);


alter table "public"."measure_codes" enable row level security;

alter table "public"."users_doctors" add column "county" text not null default '""'::text;

CREATE INDEX idx_doctors_county ON public.users_doctors USING btree (county);

CREATE UNIQUE INDEX measure_codes_pkey ON public.measure_codes USING btree (id);

CREATE UNIQUE INDEX measure_codes_real_desc_key ON public.measure_codes USING btree (real_desc);

alter table "public"."measure_codes" add constraint "measure_codes_pkey" PRIMARY KEY using index "measure_codes_pkey";

alter table "public"."measure_codes" add constraint "measure_codes_real_desc_key" UNIQUE using index "measure_codes_real_desc_key";

grant delete on table "public"."measure_codes" to "anon";

grant insert on table "public"."measure_codes" to "anon";

grant references on table "public"."measure_codes" to "anon";

grant select on table "public"."measure_codes" to "anon";

grant trigger on table "public"."measure_codes" to "anon";

grant truncate on table "public"."measure_codes" to "anon";

grant update on table "public"."measure_codes" to "anon";

grant delete on table "public"."measure_codes" to "authenticated";

grant insert on table "public"."measure_codes" to "authenticated";

grant references on table "public"."measure_codes" to "authenticated";

grant select on table "public"."measure_codes" to "authenticated";

grant trigger on table "public"."measure_codes" to "authenticated";

grant truncate on table "public"."measure_codes" to "authenticated";

grant update on table "public"."measure_codes" to "authenticated";

grant delete on table "public"."measure_codes" to "service_role";

grant insert on table "public"."measure_codes" to "service_role";

grant references on table "public"."measure_codes" to "service_role";

grant select on table "public"."measure_codes" to "service_role";

grant trigger on table "public"."measure_codes" to "service_role";

grant truncate on table "public"."measure_codes" to "service_role";

grant update on table "public"."measure_codes" to "service_role";

create policy "Select Measure Codes"
on "public"."measure_codes"
as permissive
for select
to anon, authenticated
using (true);



