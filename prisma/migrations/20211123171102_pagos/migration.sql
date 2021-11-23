-- CreateTable
CREATE TABLE "pagos" (
    "id" VARCHAR(255) NOT NULL,
    "fecha" VARCHAR(255),
    "forma" VARCHAR(255),
    "forma_pago_nombre" VARCHAR(255),
    "receptor" VARCHAR(255),
    "receptor_nombre" VARCHAR(255),
    "monto" VARCHAR(255),
    "monto_recibido" VARCHAR(255),
    "num_operacion" VARCHAR(255),
    "cuenta_bancaria_movimiento" VARCHAR(255),
    "cuenta_bancaria_movimiento_nombre" VARCHAR(255),
    "status_pago" VARCHAR(255),
    "status_pago_nombre" VARCHAR(255),
    "comprobante_pagado" VARCHAR(255),
    "empresa" VARCHAR(255),
    "empresa_nombre" VARCHAR(255),
    "fecha_qn" VARCHAR(255),

    CONSTRAINT "pagos_pkey" PRIMARY KEY ("id")
);
