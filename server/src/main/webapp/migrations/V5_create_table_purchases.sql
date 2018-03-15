-- Nombre de la tabla --> Table: public.purchases

-- Esta parte se descomenta despues de la segunda corrida del programa 
DROP TABLE public.purchases;

CREATE TABLE public.purchases
(
    purid bigint NOT NULL DEFAULT nextval('purchases_purid_seq'::regclass),
    date timestamp without time zone,
    providerid bigint NOT NULL,
    document_number character varying(60) COLLATE pg_catalog."default" NOT NULL,
    description character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT purchases_pkey PRIMARY KEY (purid),
    CONSTRAINT rel_purchases_provider FOREIGN KEY (providerid)
        REFERENCES public.provider (providerid) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.purchases
    OWNER to postgres;

#Creada por María Mercedes Retolaza Reyna