-- Nombre de la tabla --> Table: public.provider

-- Esta parte se descomenta despues de la segunda corrida del programa 
DROP TABLE public.provider;

CREATE TABLE public.provider
(
    providerid bigint NOT NULL DEFAULT nextval('provider_providerid_seq'::regclass),
    phone character varying(20) COLLATE pg_catalog."default",
    mobile character varying(20) COLLATE pg_catalog."default",
    address character varying(60) COLLATE pg_catalog."default",
    country_code character varying(10) COLLATE pg_catalog."default",
    contact_name character varying(60) COLLATE pg_catalog."default",
    location character varying(60) COLLATE pg_catalog."default",
    name character varying(60) COLLATE pg_catalog."default" NOT NULL,
    email character varying(60) COLLATE pg_catalog."default",
    CONSTRAINT provider_pkey PRIMARY KEY (providerid)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.provider
    OWNER to postgres;

#Creada por María Mercedes Retolaza Reyna