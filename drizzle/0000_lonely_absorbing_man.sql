CREATE TABLE "word" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"word" varchar(255) NOT NULL,
	"translation" varchar(225) NOT NULL,
	"hint" varchar(255) NOT NULL,
	"count" integer DEFAULT 0,
	"status" varchar(50) DEFAULT 'new' NOT NULL,
	"language" varchar(10) DEFAULT 'en' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now(),
	"updatedAt" timestamp with time zone DEFAULT now()
);
