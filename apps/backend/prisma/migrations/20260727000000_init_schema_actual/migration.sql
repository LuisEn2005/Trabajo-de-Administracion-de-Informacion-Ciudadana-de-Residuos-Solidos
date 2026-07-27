-- CreateEnum
CREATE TYPE "FrecuenciaRuta" AS ENUM ('SEMANAL', 'QUINCENAL');

-- CreateEnum
CREATE TYPE "DiaSemana" AS ENUM ('LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'DOMINGO');

-- CreateEnum
CREATE TYPE "Turno" AS ENUM ('MANANA', 'TARDE', 'NOCHE');

-- CreateEnum
CREATE TYPE "TipoCarroceria" AS ENUM ('COMPACTADOR', 'BARANDA');

-- CreateEnum
CREATE TYPE "EstadoPuntoRecoleccion" AS ENUM ('ACTIVO', 'INACTIVO', 'MANTENIMIENTO');

-- CreateEnum
CREATE TYPE "TipoContenedor" AS ENUM ('ORGANICO', 'INORGANICO', 'RECICLABLE', 'MIXTO');

-- CreateEnum
CREATE TYPE "EstadoContenedor" AS ENUM ('OPERATIVO', 'LLENO', 'DANADO', 'EN_MANTENIMIENTO', 'RETIRADO');

-- CreateEnum
CREATE TYPE "EstadoAsignacionOperativa" AS ENUM ('PROGRAMADA', 'ACTIVA', 'FINALIZADA', 'CANCELADA');

-- CreateTable
CREATE TABLE "rutas" (
    "id" SERIAL NOT NULL,
    "numero" INTEGER NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "descripcion_cobertura" TEXT NOT NULL,
    "activa" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rutas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "horarios_ruta" (
    "id" SERIAL NOT NULL,
    "ruta_id" INTEGER NOT NULL,
    "frecuencia" "FrecuenciaRuta" NOT NULL,
    "dia_semana" "DiaSemana" NOT NULL,
    "turno" "Turno" NOT NULL,
    "hora_inicio" TIME(0) NOT NULL,
    "hora_fin" TIME(0) NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "horarios_ruta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehiculos" (
    "id" SERIAL NOT NULL,
    "placa" VARCHAR(10) NOT NULL,
    "carroceria" "TipoCarroceria" NOT NULL,
    "ruta_id" INTEGER NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehiculos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "administradores" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "administradores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "puntos_recoleccion" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(120) NOT NULL,
    "direccion" VARCHAR(200) NOT NULL,
    "referencia" VARCHAR(200),
    "latitud" DECIMAL(10,7) NOT NULL,
    "longitud" DECIMAL(10,7) NOT NULL,
    "estado" "EstadoPuntoRecoleccion" NOT NULL DEFAULT 'ACTIVO',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "puntos_recoleccion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contenedores" (
    "id" SERIAL NOT NULL,
    "codigo" VARCHAR(50) NOT NULL,
    "tipo" "TipoContenedor" NOT NULL,
    "capacidad" DECIMAL(10,2) NOT NULL,
    "estado" "EstadoContenedor" NOT NULL DEFAULT 'OPERATIVO',
    "punto_recoleccion_id" INTEGER,
    "fecha_instalacion" DATE,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contenedores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "asignaciones_operativas" (
    "id" SERIAL NOT NULL,
    "ruta_id" INTEGER NOT NULL,
    "vehiculo_id" INTEGER NOT NULL,
    "horario_id" INTEGER NOT NULL,
    "estado" "EstadoAsignacionOperativa" NOT NULL DEFAULT 'PROGRAMADA',
    "fecha" DATE,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "asignaciones_operativas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rutas_puntos_recoleccion" (
    "ruta_id" INTEGER NOT NULL,
    "punto_recoleccion_id" INTEGER NOT NULL,
    "orden" INTEGER,

    CONSTRAINT "rutas_puntos_recoleccion_pkey" PRIMARY KEY ("ruta_id","punto_recoleccion_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rutas_numero_key" ON "rutas"("numero");

-- CreateIndex
CREATE INDEX "horarios_ruta_ruta_id_idx" ON "horarios_ruta"("ruta_id");

-- CreateIndex
CREATE UNIQUE INDEX "horarios_ruta_ruta_id_dia_semana_hora_inicio_key" ON "horarios_ruta"("ruta_id", "dia_semana", "hora_inicio");

-- CreateIndex
CREATE UNIQUE INDEX "vehiculos_placa_key" ON "vehiculos"("placa");

-- CreateIndex
CREATE INDEX "vehiculos_ruta_id_idx" ON "vehiculos"("ruta_id");

-- CreateIndex
CREATE UNIQUE INDEX "administradores_email_key" ON "administradores"("email");

-- CreateIndex
CREATE INDEX "puntos_recoleccion_estado_idx" ON "puntos_recoleccion"("estado");

-- CreateIndex
CREATE UNIQUE INDEX "contenedores_codigo_key" ON "contenedores"("codigo");

-- CreateIndex
CREATE INDEX "contenedores_estado_idx" ON "contenedores"("estado");

-- CreateIndex
CREATE INDEX "contenedores_punto_recoleccion_id_idx" ON "contenedores"("punto_recoleccion_id");

-- CreateIndex
CREATE INDEX "asignaciones_operativas_ruta_id_idx" ON "asignaciones_operativas"("ruta_id");

-- CreateIndex
CREATE INDEX "asignaciones_operativas_vehiculo_id_idx" ON "asignaciones_operativas"("vehiculo_id");

-- CreateIndex
CREATE INDEX "asignaciones_operativas_horario_id_idx" ON "asignaciones_operativas"("horario_id");

-- CreateIndex
CREATE INDEX "asignaciones_operativas_estado_idx" ON "asignaciones_operativas"("estado");

-- CreateIndex
CREATE INDEX "rutas_puntos_recoleccion_punto_recoleccion_id_idx" ON "rutas_puntos_recoleccion"("punto_recoleccion_id");

-- AddForeignKey
ALTER TABLE "horarios_ruta" ADD CONSTRAINT "horarios_ruta_ruta_id_fkey" FOREIGN KEY ("ruta_id") REFERENCES "rutas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehiculos" ADD CONSTRAINT "vehiculos_ruta_id_fkey" FOREIGN KEY ("ruta_id") REFERENCES "rutas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contenedores" ADD CONSTRAINT "contenedores_punto_recoleccion_id_fkey" FOREIGN KEY ("punto_recoleccion_id") REFERENCES "puntos_recoleccion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asignaciones_operativas" ADD CONSTRAINT "asignaciones_operativas_ruta_id_fkey" FOREIGN KEY ("ruta_id") REFERENCES "rutas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asignaciones_operativas" ADD CONSTRAINT "asignaciones_operativas_vehiculo_id_fkey" FOREIGN KEY ("vehiculo_id") REFERENCES "vehiculos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asignaciones_operativas" ADD CONSTRAINT "asignaciones_operativas_horario_id_fkey" FOREIGN KEY ("horario_id") REFERENCES "horarios_ruta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rutas_puntos_recoleccion" ADD CONSTRAINT "rutas_puntos_recoleccion_ruta_id_fkey" FOREIGN KEY ("ruta_id") REFERENCES "rutas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rutas_puntos_recoleccion" ADD CONSTRAINT "rutas_puntos_recoleccion_punto_recoleccion_id_fkey" FOREIGN KEY ("punto_recoleccion_id") REFERENCES "puntos_recoleccion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

