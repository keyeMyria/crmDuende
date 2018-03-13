-- Nombre de la tabla --> Table: public.users

-- Esta parte se descomenta despues de la segunda corrida del programa 
-- DROP TABLE public.users;

CREATE TABLE public.users
(
    userid bigint NOT NULL DEFAULT nextval('users_userid_seq'::regclass),
    phone character varying(20) COLLATE pg_catalog."default",
    user_name character varying(20) COLLATE pg_catalog."default",
    mobile character varying(20) COLLATE pg_catalog."default",
    storeid bigint NOT NULL,
    name character varying(60) COLLATE pg_catalog."default" NOT NULL,
    picture character varying(20) COLLATE pg_catalog."default",
    last_name character varying(60) COLLATE pg_catalog."default",
    email character varying(60) COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (userid),
    CONSTRAINT rel_users_store FOREIGN KEY (storeid)
        REFERENCES public.stores (storeid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.users
    OWNER to postgres;


#Creada por María Mercedes Retolaza Reyna