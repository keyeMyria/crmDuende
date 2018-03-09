-- Nombre de la tabla --> Table: public.category

-- Esta parte se descomenta despues de la segunda corrida del programa 
-- DROP TABLE public.category;

CREATE TABLE public.category
(
    categoryid bigint NOT NULL DEFAULT nextval('category_categoryid_seq'::regclass),
    name character varying(60) COLLATE pg_catalog."default" NOT NULL,
    description character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT category_pkey PRIMARY KEY (categoryid)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.category
    OWNER to postgres;

#Creada por María Mercedes Retolaza Reyna