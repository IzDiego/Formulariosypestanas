-- CreateTable
CREATE TABLE "monedas" (
    "soporte_moneda_id" VARCHAR(255) NOT NULL,
    "soporte_idioma_id" VARCHAR(255) NOT NULL,
    "soporte_moneda_clave" VARCHAR(255) NOT NULL,
    "soporte_moneda_nombre" VARCHAR(255) NOT NULL,
    "soporte_moneda_decimales" VARCHAR(255) NOT NULL,
    "soporte_moneda_porcentaje_variacion" VARCHAR(255) NOT NULL,
    "soporte_moneda_nombre_singular" VARCHAR(255) NOT NULL,
    "soporte_moneda_nombre_plural" VARCHAR(255) NOT NULL,
    "soporte_moneda_denominacion" VARCHAR(255) NOT NULL,
    "soporte_moneda_simbolo" VARCHAR(255) NOT NULL,
    "soporte_moneda_status" VARCHAR(255) NOT NULL,

    CONSTRAINT "monedas_pkey" PRIMARY KEY ("soporte_moneda_id")
);
