import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
// Importamos los componentes que se anidan (asumiendo alias @components)
import Avatar from '/src/components/Avatar';
import Chip from '/src/components/Chip';

/**
 * @typedef {Object} IconProps
 * @property {string} icon
 * @property {string} [color]
 * @property {number} [size]
 */

/**
 * @typedef {Object} ChipProps
 * @property {string} style
 * @property {string} text
 * @property {boolean} [selection]
 */

/**
 * @typedef {Object} AvatarProps
 * @property {string} [img]
 * @property {string} [name]
 */

/**
 * @typedef {Object} ButtonProp
 * @property {string} style
 * @property {string} [href]
 * @property {boolean} [disabled]
 * @property {string} [id]
 * @property {string} [className]
 * @property {string} text
 */


/**
 * @typedef {Object} MenuItemProps
 * @property {IconProps} [iconLeft]
 * @property {IconProps} [iconRight]
 * @property {ChipProps} [chip]
 * @property {AvatarProps} [avatar]
 * @property {string} [text]
 * @property {string} [textHelp]
 * @property {boolean} [switchLabel]
 * @property {string} [id]
 * @property {string} [href]
 * @property {ButtonProp} [button]
 * @property {string} [className]
 */

const MenuItem = ({
    chip,
    avatar,
    text,
    textHelp,
    switchLabel, // Asumo que tienes un componente Switch.jsx
    iconLeft,
    iconRight,
    id,
    href,
    button, // Asumo que tienes un componente Button.jsx
    className,
}) => {
    // Contenido JSX repetido dentro del enlace o div
    const content = (
        <>
            {iconLeft && (
                <span className={`pl-1`}>
                    {iconLeft}
                </span>
            )}
            {avatar && (
                <span className="px-1">
                    <Avatar img={avatar.img} name={avatar.name} />
                </span>
            )}
            <div className="texto-label flex flex-col pr-4 pl-2">
                <span className="text-pretty text-text-950 dark:text-text-50">
                    {text}
                </span>
                {textHelp && (
                    <span className="text-text-700 dark:text-text-300">
                        {textHelp}
                    </span>
                )}
            </div>

            {/* Opciones de la derecha (se renderizan al final con justify-between) */}
            {chip && (
                <span className="pr-2 ml-auto">
                    {chip}
                </span>
            )}
            {switchLabel && (
                <span className="pr-2 ml-auto">
                    {switchLabel}
                </span>
            )}

            {button}

            {iconRight && (
                <span className={`pr-1 ml-auto`}>
                    {iconRight}
                </span>
            )}
        </>
    );

    // Renderizado condicional: <a> (si tiene href) o <div>
    if (href) {
        // Usamos Link de react-router-dom para navegación interna
        return (
            <Link
                to={href}
                className={`flex hover:bg-background-50 dark:hover:bg-background-800 hover:shadow-sm transition-colors min-h-12 w-full flex-row items-center px-2 py-1 ${className}`}
                id={id}>
                {content}
            </Link>
        );
    } else {
        // Renderiza un <div> si no es navegable (para acciones internas o títulos)
        return (
            <div
                className={`flex min-h-12 w-full flex-row items-center px-2 py-1 ${className}`}
                id={id}>
                {content}
            </div>
        );
    }
};

export default MenuItem;