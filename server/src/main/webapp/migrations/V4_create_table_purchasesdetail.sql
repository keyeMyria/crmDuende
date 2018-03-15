-- Nombre de la tabla --> Table: public.purchasesdetail

-- Esta parte se descomenta despues de la segunda corrida del programa 
DROP TABLE public.purchasesdetail;

CREATE TABLE public.purchasesdetail
(
    purdetailid bigint NOT NULL DEFAULT nextval('purchasesdetail_purdetailid_seq'::regclass),
    purid bigint NOT NULL,
    productid bigint NOT NULL,
    cost character varying(100) COLLATE pg_catalog."default",
    sales_price character varying(100) COLLATE pg_catalog."default",
    count integer NOT NULL,
    CONSTRAINT purchasesdetail_pkey PRIMARY KEY (purdetailid),
    CONSTRAINT rel_purDetail_product FOREIGN KEY (productid)
        REFERENCES public.products (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT rel_purDetail_purchases FOREIGN KEY (purid)
        REFERENCES public.purchases (purid) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.purchasesdetail
    OWNER to postgres;

#Creada por María Mercedes Retolaza Reyna