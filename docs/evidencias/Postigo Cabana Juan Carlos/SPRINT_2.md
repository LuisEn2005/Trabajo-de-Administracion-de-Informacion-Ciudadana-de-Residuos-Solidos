# Sprint 2 - Juan Carlos Postigo

## Resumen del avance

| Elemento | Detalle |
|---|---|
| Integrante | Juan Carlos Postigo |
| Sprint | Sprint 2 |
| Modulo | Autenticacion administrativa |
| Responsabilidad | Login administrativo, JWT, perfil y proteccion global |
| Archivo principal | `apps/backend/src/modules/auth/interfaz/services/auth.service.ts` |
| Controlador | `apps/backend/src/modules/auth/presentacion/controllers/auth.controller.ts` |
| Servicio | `apps/backend/src/modules/auth/interfaz/services/auth.service.ts` |
| Contrato | `apps/backend/src/modules/auth/repositorio/administrador.repository.ts` |
| Entidad o DTO principal | `apps/backend/src/modules/auth/dominio/entities/administrador.entity.ts` |

## Metodos pendientes de implementacion

| Metodo | Que debe implementar | Endpoint relacionado |
|---|---|---|
| validarCredenciales() | Buscar admin por correo, verificar activo y contrasena. | Metodo interno |
| iniciarSesion() | Coordinar login y devolver token mas datos publicos. | POST /api/v1/auth/login |
| generarToken() | Crear payload y firmar JWT. | Metodo interno |
| obtenerPerfil() | Devolver perfil sin datos sensibles. | GET /api/v1/auth/perfil |
| validarAdministrador() | Validar payload JWT y estado del admin. | Metodo interno |
| buscarPorEmail() | Consultar administrador por email con Prisma. | Metodo interno |
| buscarPorId() | Consultar administrador por id con Prisma. | Metodo interno |

## Evidencia pendiente por completar

- Commits propios del Sprint 2: `PENDIENTE: colocar hash y mensaje del commit`.
- Historias de usuario bajo responsabilidad: `PENDIENTE: colocar codigo o nombre de HU`.
- Checklist de la historia: completar la tabla del `README.md` de esta carpeta.
- Evidencia de pruebas manuales o automatizadas: `PENDIENTE`.
