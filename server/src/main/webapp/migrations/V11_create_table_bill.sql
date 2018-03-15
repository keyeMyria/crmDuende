-- Nombre de la tabla --> Table: public.bill

-- Esta parte se descomenta despues de la segunda corrida del programa 
-- DROP TABLE public.bill;

CREATE TABLE public.bill
(
    billid bigint NOT NULL DEFAULT nextval('bill_billid_seq'::regclass),
    userid bigint NOT NULL,
    date timestamp without time zone,
    num_bill character varying(100) COLLATE pg_catalog."default" NOT NULL,
    clientid bigint NOT NULL,
    CONSTRAINT bill_pkey PRIMARY KEY (billid),
    CONSTRAINT rel_bill_users FOREIGN KEY (userid)
        REFERENCES public.users (userid) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT rel_bill_clients FOREIGN KEY (clientid)
        REFERENCES public.clients (clientid) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.bill
    OWNER to postgres;


#Creada por María Mercedes Retolaza Reyna