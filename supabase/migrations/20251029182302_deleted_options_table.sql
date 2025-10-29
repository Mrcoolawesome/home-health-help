drop policy "Auth and anon can select" on "public"."sort_options";

revoke delete on table "public"."sort_options" from "anon";

revoke insert on table "public"."sort_options" from "anon";

revoke references on table "public"."sort_options" from "anon";

revoke select on table "public"."sort_options" from "anon";

revoke trigger on table "public"."sort_options" from "anon";

revoke truncate on table "public"."sort_options" from "anon";

revoke update on table "public"."sort_options" from "anon";

revoke delete on table "public"."sort_options" from "authenticated";

revoke insert on table "public"."sort_options" from "authenticated";

revoke references on table "public"."sort_options" from "authenticated";

revoke select on table "public"."sort_options" from "authenticated";

revoke trigger on table "public"."sort_options" from "authenticated";

revoke truncate on table "public"."sort_options" from "authenticated";

revoke update on table "public"."sort_options" from "authenticated";

revoke delete on table "public"."sort_options" from "service_role";

revoke insert on table "public"."sort_options" from "service_role";

revoke references on table "public"."sort_options" from "service_role";

revoke select on table "public"."sort_options" from "service_role";

revoke trigger on table "public"."sort_options" from "service_role";

revoke truncate on table "public"."sort_options" from "service_role";

revoke update on table "public"."sort_options" from "service_role";

alter table "public"."sort_options" drop constraint "sort_options_pkey";

drop index if exists "public"."sort_options_pkey";

drop table "public"."sort_options";


