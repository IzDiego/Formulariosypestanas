-- CreateTable
CREATE TABLE `pagos` (
    `id` VARCHAR(255) NOT NULL,
    `fecha` VARCHAR(255) NULL,
    `forma` VARCHAR(255) NULL,
    `forma_pago_nombre` VARCHAR(255) NULL,
    `receptor` VARCHAR(255) NULL,
    `receptor_nombre` VARCHAR(255) NULL,
    `monto` VARCHAR(255) NULL,
    `monto_recibido` VARCHAR(255) NULL,
    `num_operacion` VARCHAR(255) NULL,
    `cuenta_bancaria_movimiento` VARCHAR(255) NULL,
    `cuenta_bancaria_movimiento_nombre` VARCHAR(255) NULL,
    `status_pago` VARCHAR(255) NULL,
    `status_pago_nombre` VARCHAR(255) NULL,
    `comprobante_pagado` VARCHAR(255) NULL,
    `empresa` VARCHAR(255) NULL,
    `empresa_nombre` VARCHAR(255) NULL,
    `fecha_qn` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
