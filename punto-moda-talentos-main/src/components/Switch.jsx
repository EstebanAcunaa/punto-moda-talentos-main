import React, { useState } from 'react';
import { IconInfoCircleFilled } from '@tabler/icons-react';

/**
 * @typedef {Object} SwitchProps
 * @property {boolean} [disabled] - Deshabilita el switch.
 * @property {boolean} [required] - Muestra un asterisco de requerido.
 * @property {string} [info] - Texto para el tooltip de información.
 * @property {string} [optional] - Texto opcional para la etiqueta.
 * @property {string} [HelpText] - Texto de ayuda bajo la etiqueta.
 * @property {boolean} [HelpTextDanger] - Hace que el texto de ayuda sea rojo.
 * @property {React.ReactNode} [text] - El contenido de la etiqueta principal del switch.
 * @property {boolean} [defaultChecked] - Estado inicial (no controlado).
 * @property {function} [onChange] - Manejador de eventos al cambiar el estado.
 */

/**
 * Componente Switch de React.
 * @param {SwitchProps} props
 */
const Switch = ({
    disabled = false,
    required,
    optional,
    HelpText,
    info,
    HelpTextDanger,
    text,
    defaultChecked = false,
    onChange,
    ...props
}) => {
    // Usamos useState para manejar el estado interno del switch (no controlado por defecto)
    const [isChecked, setIsChecked] = useState(defaultChecked);

    const handleToggle = (e) => {
        // El estado del input se maneja internamente por React, solo pasamos el evento
        const newCheckedState = e.target.checked;
        setIsChecked(newCheckedState);

        // Llama a la función onChange si se proporciona, para permitir control externo
        if (onChange) {
            onChange(newCheckedState);
        }
    };

    // Clases para el texto de ayuda (HelpText)
    const helpTextClass = HelpTextDanger
        ? 'text-danger-700 dark:text-danger-300'
        : 'text-text-700 dark:text-text-300';

    // Clases del contenedor principal
    const labelClasses = `flex flex-row gap-4 items-center ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'
        }`;

    return (
        <label className={labelClasses} {...props}>

            {/* Input de Checkbox (Oculto) */}
            <input
                type="checkbox"
                value=""
                className="peer sr-only" // sr-only oculta visualmente pero mantiene accesibilidad
                disabled={disabled}
                checked={isChecked}
                onChange={handleToggle}
            />

            {/* Contenedor Visual del Switch */}
            <div
                className="relative h-6 w-11 rounded-full bg-background-400 peer-checked:bg-primary-600 after:absolute after:start-0.5 after:top-0.5 after:size-5 after:rounded-full after:bg-background-100 after:transition-all after:duration-200 after:ease-in-out after:content-[''] peer-checked:after:translate-x-full peer-checked:after:bg-primary-100 peer-active:after:scale-110 rtl:peer-checked:after:-translate-x-full dark:bg-background-600 peer-checked:dark:bg-primary-400 dark:peer-checked:after:bg-primary-950"
            >
                {/* Nota: En React, el contenido de 'after:content-['']' se maneja 
                    en Tailwind CSS, no necesitamos JS adicional. */}
            </div>

            {/* Contenedor de Textos */}
            <div>
                <span className="flex flex-row items-center gap-1">
                    <span className="texto-label text-text-950 select-none dark:text-text-50">
                        {text}
                    </span>

                    {/* Texto Opcional */}
                    {optional && (
                        <span className="texto-label text-text-700 select-none dark:text-text-300">
                            ({optional})
                        </span>
                    )}

                    {/* Indicador Requerido */}
                    {required && (
                        <span className="texto-label text-danger-600 select-none dark:text-danger-400">
                            *
                        </span>
                    )}

                    {/* Icono y Tooltip de Información */}
                    {info && (
                        <span>
                            <IconInfoCircleFilled
                                data-tooltip-target="tooltip-no-arrow"
                                size={18} // Asumo un tamaño razonable
                            />
                            <div
                                id="tooltip-no-arrow"
                                role="tooltip"
                                className="tooltip invisible absolute z-10 inline-block rounded-lg bg-background-800 px-3 py-2 text-sm font-medium text-text-50 opacity-0 shadow-xs transition-opacity duration-300 dark:bg-background-200 dark:text-text-950"
                            >
                                {info}
                            </div>
                        </span>
                    )}
                </span>

                {/* Texto de Ayuda */}
                {HelpText && (
                    <span className={`texto-label font-bold select-none ${helpTextClass}`}>
                        {HelpText}
                    </span>
                )}
            </div>
        </label>
    );
};

export default Switch;  