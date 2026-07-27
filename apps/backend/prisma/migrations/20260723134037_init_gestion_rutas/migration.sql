-- CreateEnum
CREATE TYPE "FrecuenciaRuta" AS ENUM ('SEMANAL', 'QUINCENAL');

-- CreateEnum
CREATE TYPE "DiaSemana" AS ENUM ('LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'DOMINGO');

-- CreateEnum
CREATE TYPE "Turno" AS ENUM ('MANANA', 'TARDE', 'NOCHE');

-- CreateEnum
CREATE TYPE "TipoCarroceria" AS ENUM ('COMPACTADOR', 'BARANDA');

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

-- AddForeignKey
ALTER TABLE "horarios_ruta" ADD CONSTRAINT "horarios_ruta_ruta_id_fkey" FOREIGN KEY ("ruta_id") REFERENCES "rutas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehiculos" ADD CONSTRAINT "vehiculos_ruta_id_fkey" FOREIGN KEY ("ruta_id") REFERENCES "rutas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
