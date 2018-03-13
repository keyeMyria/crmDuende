--Nombre de la tabla -->  Table: public.billdetail

-- Esta parte se descomenta despues de la segunda corrida del programa 
-- DROP TABLE public.billdetail;

CREATE TABLE public.billdetail
(
    billdetailid bigint NOT NULL DEFAULT nextval('billdetail_billdetailid_seq'::regclass),
    billid bigint NOT NULL,
    sale_price character varying(100) COLLATE pg_catalog."default",
    productid bigint NOT NULL,
    cost character varying(100) COLLATE pg_catalog."default",
    count integer NOT NULL,
    CONSTRAINT billdetail_pkey PRIMARY KEY (billdetailid),
    CONSTRAINT rel_billDetail_bill FOREIGN KEY (billid)
        REFERENCES public.bill (billid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT rel_billDetail_product FOREIGN KEY (productid)
        REFERENCES public.products (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.billdetail
    OWNER to postgres;


#Creada por María Mercedes Retolaza Reyna