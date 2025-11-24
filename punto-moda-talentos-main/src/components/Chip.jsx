import React, { useMemo } from 'react';

/**
 * @typedef {Object} ChipProps
 * @property {'primary' | 'danger' | 'warning' | 'success' | 'info' | 'background' | string} [style] - El esquema de color del chip.
 * @property {boolean} [selection] - Si el chip está en estado 'seleccionado' (true) o 'no seleccionado' (false).
 * @property {React.ReactNode} [children] - El contenido principal del texto del chip.
 * @property {React.ReactNode} [iconLeft] - Contenido para el slot del icono izquierdo.
 * @property {React.ReactNode} [iconRight] - Contenido para el slot del icono derecho.
 */

/**
 * Componente Chip de React.
 * @param {ChipProps} props
 */
const Chip = ({
    style = 'primary',
    selection = false,
    children,
    iconLeft,
    iconRight,
    className,
    ...props
}) => {
    const styleClasses = useMemo(() => {
        let classes = '';

        // Clase base que aplica a todos los estilos
        const baseClass = "flex w-min transition-colors flex-row transition-all ease-in-out items-center rounded-xl px-2 py-1 outline outline-1 " + (className || '');

        // Lógica de estilos cuando el chip está SELECCIONADO (selection = true)
        if (selection) {
            switch (style) {
                case 'primary':
                    classes = "bg-primary-300 dark:bg-primary-800 text-primary-600 dark:text-primary-200 outline-primary-400 dark:outline-primary-600";
                    break;
                case 'background':
                    classes = "bg-background-300 dark:bg-background-800 text-background-600 dark:text-background-200 outline-background-400 dark:outline-background-600";
                    break;
                case 'danger':
                    classes = "bg-danger-300 dark:bg-danger-800 text-danger-600 dark:text-danger-200 outline-danger-400 dark:outline-danger-600";
                    break;
                case 'warning':
                    classes = "bg-warning-300 dark:bg-warning-800 text-warning-600 dark:text-warning-200 outline-warning-400 dark:outline-warning-600";
                    break;
                case 'success':
                    classes = "bg-success-300 dark:bg-success-800 text-success-600 dark:text-success-200 outline-success-400 dark:outline-success-600";
                    break;
                case 'info':
                    classes = "bg-info-300 dark:bg-info-800 text-info-600 dark:text-info-200 outline-info-400 dark:outline-info-600";
                    break;
                default:
                    // Si el estilo es custom o no se encuentra, usamos el estilo primario por defecto
                    classes = "bg-primary-300 dark:bg-primary-800 text-primary-600 dark:text-primary-200 outline-primary-400 dark:outline-primary-600";
            }
            // Lógica de estilos cuando el chip NO está SELECCIONADO (selection = false)
        } else {
            switch (style) {
                case 'primary':
                    classes = "text-primary-600 dark:text-primary-400 outline-primary-600 dark:outline-primary-400";
                    break;
                case 'background':
                    classes = "text-background-600 dark:text-background-400 outline-background-600 dark:outline-background-400";
                    break;
                case 'danger':
                    classes = "text-danger-600 dark:text-danger-400 outline-danger-600 dark:outline-danger-400";
                    break;
                case 'warning':
                    classes = "text-warning-600 dark:text-warning-400 outline-warning-600 dark:outline-warning-400";
                    break;
                case 'success':
                    classes = "text-success-600 dark:text-success-400 outline-success-600 dark:outline-success-400";
                    break;
                case 'info':
                    classes = "text-info-600 dark:text-info-400 outline-info-600 dark:outline-info-400";
                    break;
                default:
                    classes = "text-primary-600 dark:text-primary-400 outline-primary-600 dark:outline-primary-400";
            }
        }

        return `${baseClass} ${classes}`;
    }, [style, selection, className]);

    return (
        <span
            className={styleClasses}
            {...props}
        >

            {iconLeft}

            <span className="texto-label px-2 select-none text-nowrap">
                {children}
            </span>

            {iconRight}
        </span>
    );
};

export default Chip;