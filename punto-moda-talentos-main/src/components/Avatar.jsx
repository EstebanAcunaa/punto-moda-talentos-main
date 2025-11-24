import React, { useMemo } from 'react';
import { IconUser } from '@tabler/icons-react';

/**
 * @typedef {Object} AvatarProps
 * @property {string} [img] - URL de la imagen del avatar.
 * @property {string} [name] - Nombre del usuario (se usa la primera letra si no hay imagen).
 * @property {boolean} [notification] - Muestra un punto de notificación rojo.
 * @property {boolean} [status] - Muestra un punto de estado verde.
 */

/**
 * Componente Avatar de React.
 * Muestra una imagen, la inicial del nombre o un icono de usuario.
 * @param {AvatarProps} props
 */
const Avatar = ({ img = false, name = false, notification = false, status = false, ...props }) => {

    // Lógica para determinar el contenido central del Avatar
    const AvatarContent = useMemo(() => {
        // Caso 1: Se proporciona una URL de imagen
        if (img) {
            return (
                <img
                    src={img}
                    className="size-10 rounded-full border-2 border-background-100 object-cover dark:border-background-800"
                    alt={name ? `Avatar de ${name}` : "Avatar"}
                />
            );
        }

        // Caso 2: Se proporciona un nombre (mostrar inicial)
        if (name) {
            const initial = name[0].toUpperCase();
            return (
                <span className="texto-title flex h-10 w-10 items-center justify-center rounded-full border-2 border-background-100 bg-primary-400 text-center text-primary-800 dark:border-background-800 dark:bg-primary-600 dark:text-primary-200 select-none">
                    {initial}
                </span>
            );
        }

        // Caso 3: No hay imagen ni nombre (mostrar icono por defecto)
        return (
            <span className="texto-title flex h-10 w-10 items-center justify-center rounded-full border-2 border-background-100 bg-primary-400 text-center text-primary-800 dark:border-background-800 dark:bg-primary-600 dark:text-primary-200">
                <IconUser />
            </span>
        );
    }, [img, name]);


    return (
        <span className="relative" {...props}>
            {/* Contenido principal del Avatar (Imagen, Inicial o Icono) */}
            {AvatarContent}

            {/* Indicador de Notificación (Punto superior izquierdo) */}
            {notification && (
                <span className="absolute top-0 left-7 h-3.5 w-3.5 rounded-full border-2 border-background-100 bg-danger-600 dark:border-background-800 dark:bg-danger-400" />
            )}

            {/* Indicador de Estado (Punto inferior izquierdo) */}
            {status && (
                <span className="absolute bottom-0 left-7 h-3.5 w-3.5 rounded-full border-2 border-background-100 bg-success-600 dark:border-background-800 dark:bg-success-400" />
            )}
        </span>
    );
};

export default Avatar;