-- Nombre de la tabla --> Table: public.products

-- Esta parte se descomenta despues de la segunda corrida del programa 
DROP TABLE public.products;

CREATE TABLE public.products
(
    id bigint NOT NULL DEFAULT nextval('products_id_seq'::regclass),
    place_name character varying(50) COLLATE pg_catalog."default",
    bar_code character varying(15) COLLATE pg_catalog."default",
    serial_code character varying(10) COLLATE pg_catalog."default",
    name character varying(60) COLLATE pg_catalog."default" NOT NULL,
    categoryid bigint NOT NULL,
    CONSTRAINT products_pkey PRIMARY KEY (id),
    CONSTRAINT rel_products_category FOREIGN KEY (categoryid)
        REFERENCES public.category (categoryid) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.products
    OWNER to postgres;

#Creada por María Mercedes Retolaza Reyna