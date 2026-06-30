import { PrismaClient } from '@prisma/client';
import { UUID } from '../../../../shared/types/Base';
import { IUsuarioRepositorio } from '../../domain/repositories/IUsuarioRepositorio';
import { Usuario, Ciudadano, Administrador, RolUsuario, EstadoUsuario } from '../../domain/model/Usuario';
import { Credenciales } from '../../domain/model/Credenciales';

export class UsuarioRepositoryImpl implements IUsuarioRepositorio {
  constructor(private readonly prisma: PrismaClient) {}

  private toDomain(row: any): Usuario {
    const credenciales = Credenciales.reconstruir(row.email, row.hashContrasena);
    const base = {
      nombre: row.nombre,
      credenciales,
      rol: row.rol as RolUsuario,
      estado: row.estado as EstadoUsuario,
      fechaCreacion: row.fechaCreacion,
    };
    if (row.rol === RolUsuario.CIUDADANO) {
      return Ciudadano.reconstruir(row.id, base, {
        telefono: row.telefono ?? undefined,
        notificacionesActivas: row.notificacionesActivas ?? true,
      });
    }
    return Administrador.reconstruir(row.id, base, {
      cargo: row.cargo ?? '',
      permisosEspeciales: new Set(row.permisosEspeciales ?? []),
    });
  }

  async guardar(usuario: Usuario): Promise<void> {
    const data = (usuario as any).toPersistence();
    await this.prisma.usuario.create({ data });
  }

  async buscarPorId(idUsuario: UUID): Promise<Usuario | null> {
    const row = await this.prisma.usuario.findUnique({ where: { id: idUsuario } });
    return row ? this.toDomain(row) : null;
  }

  async buscarPorCorreo(correo: string): Promise<Usuario | null> {
    const row = await this.prisma.usuario.findUnique({ where: { email: correo } });
    return row ? this.toDomain(row) : null;
  }

  async actualizar(usuario: Usuario): Promise<void> {
    const data = (usuario as any).toPersistence();
    await this.prisma.usuario.update({ where: { id: usuario.id }, data });
  }

  async eliminar(idUsuario: UUID): Promise<void> {
    await this.prisma.usuario.delete({ where: { id: idUsuario } });
  }

  async listarPorRol(rol: RolUsuario): Promise<Usuario[]> {
    const rows = await this.prisma.usuario.findMany({ where: { rol } });
    return rows.map((r) => this.toDomain(r));
  }
}
