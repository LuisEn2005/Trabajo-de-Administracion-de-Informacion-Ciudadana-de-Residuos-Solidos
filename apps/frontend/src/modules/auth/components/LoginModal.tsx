import { LockKeyhole, UserRound, X } from 'lucide-react';
import type { FormEvent } from 'react';

type LoginModalProps = {
  onClose: () => void;
};

function LoginModal({ onClose }: LoginModalProps) {
  function manejarEnvio(evento: FormEvent<HTMLFormElement>): void {
    evento.preventDefault();
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
          <label className="block" htmlFor="usuario">
            <span className="text-sm font-bold text-slate-700">Usuario</span>
            <span className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-300 bg-white px-4 py-3 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
              <UserRound aria-hidden="true" className="text-slate-400" size={18} />
              <input
                className="w-full bg-transparent text-sm text-slate-950 outline-none placeholder:text-slate-400"
                id="usuario"
                name="usuario"
                placeholder="usuario@is1.local"
                type="text"
              />
            </span>
          </label>

          <label className="block" htmlFor="contrasena">
            <span className="text-sm font-bold text-slate-700">Contraseña</span>
            <span className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-300 bg-white px-4 py-3 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
              <LockKeyhole aria-hidden="true" className="text-slate-400" size={18} />
              <input
                className="w-full bg-transparent text-sm text-slate-950 outline-none placeholder:text-slate-400"
                id="contrasena"
                name="contrasena"
                placeholder="••••••••"
                type="password"
              />
            </span>
          </label>

          <button
            className="w-full rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-700"
            type="submit"
          >
            Iniciar sesión
          </button>
        </form>

        <p className="mt-5 rounded-2xl bg-slate-100 px-4 py-3 text-xs leading-5 text-slate-500">
          Este formulario es una vista mock. La autenticación real debe conectarse luego con la API REST.
        </p>
      </section>
    </div>
  );
}

export default LoginModal;
