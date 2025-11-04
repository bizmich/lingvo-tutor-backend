CREATE TABLE "word" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "word_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"word" varchar(255) NOT NULL,
	"translation" varchar(225) NOT NULL,
	"hint" varchar(255) NOT NULL,
	"status" varchar DEFAULT 'new'
);
