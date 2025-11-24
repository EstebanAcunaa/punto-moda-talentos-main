import React, { useMemo } from 'react';

/**
 * @typedef {Object} ButtonIconProps
 * @property {'primary' | 'secondary' | 'tertiary' | 'text' | 'danger' | 'warning' | 'success' | 'info' | string} [style]
 * @property {string} [href]
 * @property {boolean} [disabled]
 * @property {'sm' | 'md' | 'lg' | string} [size]
 * @property {string} [id]
 * @property {string} [className]
 * @property {string} [type]
 * @property {React.ReactNode} [children]
 * @property {any} [props] // Propiedades adicionales como onClick
 */

/**
 * Componente ButtonIcon de React.
 * Diseñado para contener solo un icono (un slot).
 * @param {ButtonIconProps} props
 */
const ButtonIcon = ({
    style = 'primary',
    href,
    disabled = false,
    size = 'md',
    id,
    className = '',
    type = 'button',
    children,
    ...props
}) => {
    // 2. Definición de clases base y estilos
    const baseClasses =
        'flex flex-row items-center justify-center gap-0 rounded-xl p-2 text-nowrap transition-all duration-150 ease-in-out select-none not-disabled:hover:rounded-2xl not-disabled:hover:shadow-md not-disabled:focus:outline-2 not-disabled:focus:outline-offset-2 not-disabled:focus:outline-background-900 not-disabled:active:scale-95 disabled:cursor-not-allowed disabled:opacity-65 dark:not-disabled:focus:outline-background-200';

    const sizeClasses = useMemo(() => {
        switch (size) {
            case 'sm':
                return 'size-8';
            case 'md':
                return 'size-10';
            case 'lg':
                return 'size-12';
            default:
                return '';
        }
    }, [size]);

    const styleClasses = useMemo(() => {
        switch (style) {
            case 'primary':
                return 'bg-primary-600 text-primary-100 dark:bg-primary-400 dark:text-primary-900';
            case 'secondary':
                return 'bg-secondary-400 text-secondary-800 dark:bg-secondary-600 dark:text-secondary-200';
            case 'tertiary':
                return 'text-tertiary-600 outline-1 outline-tertiary-600 not-disabled:hover:outline-2 dark:text-tertiary-400 dark:outline-tertiary-400';
            case 'text':
                return `text-text-800 underline decoration-text-800 underline-offset-4 not-disabled:hover:text-text-700 not-disabled:hover:decoration-text-700 not-disabled:hover:decoration-2 
					${!href
                        ? 'dark:text-text-200 dark:decoration-text-200 dark:not-disabled:hover:text-text-300 dark:not-disabled:hover:decoration-text-300'
                        : ''
                    }`;
            case 'danger':
                return 'bg-danger-600 text-danger-100 dark:bg-danger-400 dark:text-danger-900';
            case 'warning':
                return 'bg-warning-600 text-warning-100 dark:bg-warning-400 dark:text-warning-900';
            case 'success':
                return 'bg-success-600 text-success-100 dark:bg-success-400 dark:text-success-900';
            case 'info':
                return 'bg-info-600 text-info-100 dark:bg-info-400 dark:text-info-900';
            default:
                return '';
        }
    }, [style, href]);

    const fullClassName = `${baseClasses} ${sizeClasses} ${styleClasses} ${className}`;

    // 3. Renderizado Condicional
    if (href) {
        return (
            <a className={fullClassName} href={href} id={id} {...props}>
                {children}
            </a>
        );
    } else {
        return (
            <button className={fullClassName} disabled={disabled} type={type} id={id} {...props}>
                {children}
            </button>
        );
    }
};

export default ButtonIcon;