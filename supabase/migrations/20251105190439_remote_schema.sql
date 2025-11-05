drop extension if exists "pg_net";

alter table "public"."measure_codes" add column "details_section" boolean;


