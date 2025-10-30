alter table "public"."measure_codes" add column "conditions_treated" boolean not null;

alter table "public"."measure_codes" add column "family_caregiver_experience" boolean not null;

alter table "public"."measure_codes" add column "location_of_care" boolean not null;

alter table "public"."measure_codes" add column "lower_is_better" boolean not null;

alter table "public"."measure_codes" add column "out_of" text not null;

alter table "public"."measure_codes" add column "quality_patient_care" boolean not null;


