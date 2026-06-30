import { ValueObject } from '../../../../shared/types/Base';
import { ValidationError } from '../../../../shared/errors/DomainError';
import * as bcrypt from 'bcrypt';

interface CredencialesProps {
  email: string;
  hashContrasena: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SALT_ROUNDS = 10;

export class Credenciales extends ValueObject<CredencialesProps> {
  private constructor(props: CredencialesProps) {
    super(props);
  }

  static async crear(email: string, contrasenaPlano: string): Promise<Credenciales> {
    if (!EMAIL_REGEX.test(email)) {
      throw new ValidationError(`Email inválido: ${email}`);
    }
    if (contrasenaPlano.length < 8) {
      throw new ValidationError('La contraseña debe tener al menos 8 caracteres');
    }
    const hashContrasena = await bcrypt.hash(contrasenaPlano, SALT_ROUNDS);
    return new Credenciales({ email, hashContrasena });
  }

  static reconstruir(email: string, hashContrasena: string): Credenciales {
    return new Credenciales({ email, hashContrasena });
  }

  get email(): string {
    return this.props.email;
  }

  get hashContrasena(): string {
    return this.props.hashContrasena;
  }

  async validar(contrasenaPlano: string): Promise<boolean> {
    return bcrypt.compare(contrasenaPlano, this.props.hashContrasena);
  }

  async actualizar(contrasenaNueva: string): Promise<Credenciales> {
    if (contrasenaNueva.length < 8) {
      throw new ValidationError('La contraseña debe tener al menos 8 caracteres');
    }
    const hashContrasena = await bcrypt.hash(contrasenaNueva, SALT_ROUNDS);
    return new Credenciales({ email: this.props.email, hashContrasena });
  }

  esValida(): boolean {
    return EMAIL_REGEX.test(this.props.email);
  }
}
