import React, { useMemo } from 'react';

/**
 * Componente Button de React.
 * @param {ButtonProps} props
 */
const Button = ({
    style = 'primary',
    href,
    disabled = false,
    id,
    className = '',
    children,
    iconLeft,
    iconRight,
    ...props
}) => {
    // 2. Lógica para generar las clases CSS
    const baseClasses =
        'texto-label relative flex min-h-10 flex-row items-center justify-center gap-0 rounded-xl px-3 text-nowrap transition-all duration-150 ease-in-out select-none not-disabled:hover:rounded-2xl not-disabled:hover:shadow-md not-disabled:focus:outline-2 not-disabled:focus:outline-offset-2 not-disabled:focus:outline-background-900 not-disabled:active:scale-95 disabled:cursor-not-allowed disabled:opacity-65 dark:not-disabled:focus:outline-background-200';

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
    }, [style, href]); // Se incluye 'href' para la variación de 'text' style

    const fullClassName = `${baseClasses} ${styleClasses} ${className}`;


    // El componente en sí
    if (href) {
        // Renderiza <a> si tiene href y no está disabled
        return (
            <a className={fullClassName} href={href} id={id} {...props}>
                {iconLeft}
                <span className="px-2">{children}</span>
                {iconRight}
            </a>
        );
    } else {
        // Renderiza <button> en cualquier otro caso
        return (
            <button className={fullClassName} disabled={disabled} {...props} id={id}>
                {iconLeft}
                <span className="px-2">{children}</span>
                {iconRight}
            </button>
        );
    }
};

export default Button;