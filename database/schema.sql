set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";
CREATE TABLE "public"."users" (
  "userId" serial PRIMARY KEY,
  "username" text not null,
  "hashedPassword" text not null,
  "createdAt" timestamptz(6) not null default now()
);
CREATE TABLE "public"."reviews" (
  "reviewId" serial PRIMARY KEY,
  "title" text not null,
  "review" text not null,
  "userId" integer not null,
  "rating" text not null,
  "photoUrl" text not null,
  "createdAt" timestamptz(6) not null default now(),
  "updatedAt" timestamptz(6)
);
CREATE TABLE "public"."watchLists" (
  "watchListId" serial PRIMARY KEY,
  "title" text not null,
  "photoUrl" text not null,
  "userId" integer not null,
  "createdAt" timestamptz(6) not null default now(),
  "updatedAt" timestamptz(6)
);
ALTER TABLE "public"."reviews" ADD FOREIGN KEY ("userId") REFERENCES "public"."users" ("userId");
ALTER TABLE "public"."watchLists" ADD FOREIGN KEY ("userId") REFERENCES "public"."users" ("userId");
