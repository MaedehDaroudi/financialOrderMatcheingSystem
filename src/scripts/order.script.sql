-- Table: public.orders

-- DROP TABLE IF EXISTS public.orders;

CREATE TABLE IF NOT EXISTS public.orders
(
    id integer NOT NULL DEFAULT nextval('orders_id_seq'::regclass),
    user_id integer NOT NULL,
    type character varying(10) COLLATE pg_catalog."default" NOT NULL,
    price bigint NOT NULL,
    status character varying COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    deleted integer DEFAULT 0,
    CONSTRAINT orders_pkey PRIMARY KEY (id),
    CONSTRAINT order_user_id_fk FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.orders
    OWNER to postgres;
-- Index: fki_order_user_id_fk

-- DROP INDEX IF EXISTS public.fki_order_user_id_fk;

CREATE INDEX IF NOT EXISTS fki_order_user_id_fk
    ON public.orders USING btree
    (user_id ASC NULLS LAST)
    TABLESPACE pg_default;