-- CreateTable
CREATE TABLE "pagos" (
    "id" VARCHAR(255) NOT NULL,
    "fecha" VARCHAR(255),
    "concepto" TEXT,
    "referencia" TEXT,
    "monto" DOUBLE PRECISION NOT NULL,
    "tipodecambio" DOUBLE PRECISION NOT NULL,
    "emisor" TEXT,
    "moneda" TEXT,
    "formadepago" TEXT,
    "status" TEXT,

    CONSTRAINT "pagos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clientes" (
    "id" SERIAL NOT NULL,
    "cliente" TEXT NOT NULL,
    "emisor" TEXT NOT NULL,
    "montorecibido" DOUBLE PRECISION NOT NULL,
    "moneda" TEXT NOT NULL,
    "tipodecambio" DOUBLE PRECISION NOT NULL,
    "formadepago" TEXT NOT NULL,
    "fecha" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "numeroperacion" TEXT NOT NULL,
    "observaciones" TEXT,
    "cuentabancaria" TEXT,
    "fechadeingreso" TEXT,
    "montoregistrado" DOUBLE PRECISION,
    "fechadeconfirmacion" TEXT,
    "observacionesalconfirmar" TEXT,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);
