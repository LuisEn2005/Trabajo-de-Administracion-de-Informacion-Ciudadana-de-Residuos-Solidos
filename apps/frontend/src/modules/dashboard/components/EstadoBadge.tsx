type EstadoBadgeProps = {
  estado: string;
};

function obtenerClasesPorEstado(estado: string): string {
  const estadoNormalizado = estado.toLowerCase();

  if (estadoNormalizado.includes('activo') || estadoNormalizado.includes('disponible') || estadoNormalizado.includes('operativo')) {
    return 'bg-emerald-100 text-emerald-700';
  }

  if (estadoNormalizado.includes('mantenimiento') || estadoNormalizado.includes('ruta') || estadoNormalizado.includes('programada')) {
    return 'bg-amber-100 text-amber-700';
  }

  if (estadoNormalizado.includes('lleno') || estadoNormalizado.includes('ocupado') || estadoNormalizado.includes('cancelada')) {
    return 'bg-rose-100 text-rose-700';
  }

  return 'bg-slate-100 text-slate-700';
}

function EstadoBadge({ estado }: EstadoBadgeProps) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${obtenerClasesPorEstado(estado)}`}>
      {estado}
    </span>
  );
}

export default EstadoBadge;
