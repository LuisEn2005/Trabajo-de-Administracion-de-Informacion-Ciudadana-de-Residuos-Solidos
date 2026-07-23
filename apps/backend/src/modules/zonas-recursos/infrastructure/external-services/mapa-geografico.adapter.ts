import { PuntoCalor } from '../../domain/entities/mapa-calor';
import { UUID } from '../../../../shared/domain/base';

export interface IMapaGeograficoServicio {
  generarPuntosCalor(reportes: { idZona: UUID; latitud: number; longitud: number }[]): PuntoCalor[];
}

export class MapaGeograficoAdapter implements IMapaGeograficoServicio {
  generarPuntosCalor(
    reportes: { idZona: UUID; latitud: number; longitud: number }[],
  ): PuntoCalor[] {
    const agrupados = new Map<UUID, { latitud: number; longitud: number; count: number }>();

    reportes.forEach((r) => {
      const existente = agrupados.get(r.idZona);
      if (existente) {
        existente.count += 1;
      } else {
        agrupados.set(r.idZona, { latitud: r.latitud, longitud: r.longitud, count: 1 });
      }
    });

    return Array.from(agrupados.entries()).map(([idZona, datos]) => ({
      idZona,
      latitud: datos.latitud,
      longitud: datos.longitud,
      intensidad: Math.min(100, datos.count * 10),
    }));
  }
}
