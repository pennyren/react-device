CREATE TABLE "user"
(
	id bigserial NOT NULL,
	username character varying(128),
	pwd character varying(255),
	ctime timestamp without time zone,
	utime timestamp  without time zone,
	role character varying(128),
	CONSTRAINT user_pkey PRIMARY KEY (id)
);

CREATE TABLE equipment
(
	id bigserial NOT NULL,
	name character varying(255),
	CONSTRAINT equipment_pkey PRIMARY KEY ("id")
);