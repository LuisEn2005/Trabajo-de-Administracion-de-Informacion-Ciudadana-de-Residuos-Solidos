import { LockKeyhole, UserRound, X } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { useAuth } from '../hooks/useAuth';

type LoginModalProps = {
  onClose: () => void;
};

function LoginModal({ onClose }: LoginModalProps) {
  const { iniciarSesion } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensajeError, setMensajeError] = useState<string | null>(null);
  const [estaEnviando, setEstaEnviando] = useState(false);

  async function manejarEnvio(evento: FormEvent<HTMLFormElement>): Promise<void> {
    evento.preventDefault();
    setMensajeError(null);
    setEstaEnviando(true);

    try {
      await iniciarSesion({ email, password });
      onClose();
    } catch (error) {
      setMensajeError(obtenerMensajeError(error));
    } finally {
      setEstaEnviando(false);
    }
  }

  return (
    <div
      aria-labelledby="login-modal-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 px-4 py-6 backdrop-blur-sm"
      role="dialog"
    >
      <section className="w-full max-w-md rounded-3xl bg-white p-7 text-slate-950 shadow-2xl shadow-slate-950/30">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">Acceso administrativo</p>
            <h2 className="mt-2 text-2xl font-black" id="login-modal-title">
              Iniciar sesión
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Ingresa tus credenciales para acceder a las funciones protegidas del sistema.
            </p>
          </div>
          <button
            aria-label="Cerrar modal de inicio de sesión"
            className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            onClick={onClose}
            type="button"
          >
            <X aria-hidden="true" size={20} />
          </button>
        </div>

        <form className="mt-7 space-y-5" onSubmit={manejarEnvio}>
          <label className="block" htmlFor="email">
            <span className="text-sm font-bold text-slate-700">Correo electrónico</span>
            <span className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-300 bg-white px-4 py-3 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
              <UserRound aria-hidden="true" className="text-slate-400" size={18} />
              <input
                autoComplete="email"
                className="w-full bg-transparent text-sm text-slate-950 outline-none placeholder:text-slate-400"
                disabled={estaEnviando}
                id="email"
                name="email"
                onChange={(evento) => setEmail(evento.target.value)}
                placeholder="admin_test@gmail.com"
                required
                type="email"
                value={email}
              />
            </span>
          </label>

          <label className="block" htmlFor="password">
            <span className="text-sm font-bold text-slate-700">Contraseña</span>
            <span className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-300 bg-white px-4 py-3 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
              <LockKeyhole aria-hidden="true" className="text-slate-400" size={18} />
              <input
                autoComplete="current-password"
                className="w-full bg-transparent text-sm text-slate-950 outline-none placeholder:text-slate-400"
                disabled={estaEnviando}
                id="password"
                name="password"
                onChange={(evento) => setPassword(evento.target.value)}
                placeholder="••••••••"
                required
                type="password"
                value={password}
              />
            </span>
          </label>

          {mensajeError && (
            <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {mensajeError}
            </p>
          )}

          <button
            aria-busy={estaEnviando}
            className="w-full rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            disabled={estaEnviando}
            type="submit"
          >
            {estaEnviando ? 'Validando credenciales...' : 'Iniciar sesión'}
          </button>
        </form>

        <p className="mt-5 rounded-2xl bg-slate-100 px-4 py-3 text-xs leading-5 text-slate-500">
          Tu sesión se mantendrá activa para que puedas administrar la información permitida del sistema de forma segura.
        </p>
      </section>
    </div>
  );
}

function obtenerMensajeError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return 'No se pudo iniciar sesión. Inténtalo nuevamente.';
}

export default LoginModal;
