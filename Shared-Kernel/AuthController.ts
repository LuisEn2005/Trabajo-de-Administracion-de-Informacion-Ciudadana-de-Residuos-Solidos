import { Request, Response, NextFunction } from 'express';
import { IUsuarioApplicationService } from '../../application/UsuarioApplicationService';

export class AuthController {
  constructor(private readonly usuarioService: IUsuarioApplicationService) {}

  registrarCiudadano = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { nombre, email, contrasena, telefono } = req.body;
      const idUsuario = await this.usuarioService.registrarCiudadano(nombre, email, contrasena, telefono);
      res.status(201).json({ idUsuario });
    } catch (err) {
      next(err);
    }
  };

  registrarAdministrador = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { nombre, email, contrasena, cargo } = req.body;
      const idUsuario = await this.usuarioService.registrarAdministrador(nombre, email, contrasena, cargo);
      res.status(201).json({ idUsuario });
    } catch (err) {
      next(err);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, contrasena } = req.body;
      const resultado = await this.usuarioService.autenticar(email, contrasena);
      res.status(200).json(resultado);
    } catch (err) {
      next(err);
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '') ?? '';
      await this.usuarioService.cerrarSesion(token);
      res.status(200).json({ message: 'Sesión cerrada' });
    } catch (err) {
      next(err);
    }
  };

  cambiarContrasena = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const idUsuario = (req as any).idUsuario;
      const { contrasenaActual, contrasenaNueva } = req.body;
      await this.usuarioService.cambiarContrasena(idUsuario, contrasenaActual, contrasenaNueva);
      res.status(200).json({ message: 'Contraseña actualizada' });
    } catch (err) {
      next(err);
    }
  };
}
