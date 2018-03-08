-- Nombre de la tabla --> Table: public.existenceline

-- Esta parte se descomenta despues de la segunda corrida del programa 
-- DROP TABLE public.existenceline;

CREATE TABLE public.existenceline
(
    id bigint NOT NULL DEFAULT nextval('existenceline_id_seq'::regclass),
    storeid bigint NOT NULL,
    quantity integer NOT NULL,
    productid bigint NOT NULL,
    CONSTRAINT existenceline_pkey PRIMARY KEY (id),
    CONSTRAINT rel_existence_products FOREIGN KEY (productid)
        REFERENCES public.products (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT rel_existence_store FOREIGN KEY (storeid)
        REFERENCES public.stores (storeid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.existenceline
    OWNER to postgres;

#Creada por María Mercedes Retolaza Reyna