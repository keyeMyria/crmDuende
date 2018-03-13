-- Nombre de la tabla --> Table: public.clients

-- Esta parte se descomenta despues de la segunda corrida del programa 
-- DROP TABLE public.clients;

CREATE TABLE public.clients
(
    clientid bigint NOT NULL DEFAULT nextval('clients_clientid_seq'::regclass),
    phone character varying(20) COLLATE pg_catalog."default",
    birthday_date timestamp without time zone,
    place_name character varying(60) COLLATE pg_catalog."default",
    location character varying(60) COLLATE pg_catalog."default",
    user_name character varying(20) COLLATE pg_catalog."default" NOT NULL,
    last_buy timestamp without time zone,
    mobile character varying(20) COLLATE pg_catalog."default",
    address character varying(60) COLLATE pg_catalog."default",
    country_code character varying(10) COLLATE pg_catalog."default",
    first_buy timestamp without time zone,
    name character varying(60) COLLATE pg_catalog."default" NOT NULL,
    picture character varying(20) COLLATE pg_catalog."default",
    last_name character varying(60) COLLATE pg_catalog."default",
    email character varying(60) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT clients_pkey PRIMARY KEY (clientid)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.clients
    OWNER to postgres;

#Creada por María Mercedes Retolaza Reyna