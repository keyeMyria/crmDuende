-- Nombre de la tabla --> Table: public.stores

-- Esta parte se descomenta despues de la segunda corrida del programa 
-- DROP TABLE public.stores;

CREATE TABLE public.stores
(
    storeid bigint NOT NULL DEFAULT nextval('stores_storeid_seq'::regclass),
    phone character varying(20) COLLATE pg_catalog."default",
    address character varying(15) COLLATE pg_catalog."default",
    place_name character varying(50) COLLATE pg_catalog."default",
    name character varying(60) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT stores_pkey PRIMARY KEY (storeid)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.stores
    OWNER to postgres;

#Creada por María Mercedes Retolaza Reyna