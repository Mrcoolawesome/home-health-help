drop extension if exists "pg_net";

alter table "public"."measure_codes" add column "is_cahps" boolean not null;

alter table "public"."measure_codes" add column "is_general_metric" boolean not null;

alter table "public"."measure_codes" add column "is_hci" boolean not null;


