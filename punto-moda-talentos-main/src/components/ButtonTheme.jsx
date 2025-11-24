import React, { useState, useEffect, useCallback } from 'react';
// Importa el componente ButtonIcon que convertimos antes
import ButtonIcon from './ButtonIcon';
// Importa los iconos de Tabler
import { IconSun, IconMoon } from '@tabler/icons-react';

const LIGHT = 'light';
const DARK = 'dark';

const ThemeToggle = (props) => {
    // Estado para guardar el tema actual. Inicializado a null para el primer renderizado.
    const [theme, setTheme] = useState(null);

    // Función para aplicar las clases y atributos al DOM
    const applyThemeToDOM = useCallback((newTheme) => {
        const element = document.documentElement;
        if (newTheme === DARK) {
            element.setAttribute('data-theme', DARK);
            element.classList.add(DARK);
        } else if (newTheme === LIGHT) {
            element.setAttribute('data-theme', LIGHT);
            element.classList.remove(DARK);
        }
    }, []);

    // 1. Función para cambiar el tema (toggle)
    const handleToggleClick = useCallback(() => {
        // Usa el estado 'theme' para determinar el nuevo tema
        const currentTheme = theme || (document.documentElement.classList.contains(DARK) ? DARK : LIGHT);
        const newTheme = currentTheme === DARK ? LIGHT : DARK;

        // Actualizar estado, DOM y localStorage
        setTheme(newTheme);
        applyThemeToDOM(newTheme);
        localStorage.setItem('picoPreferredColorScheme', newTheme);
    }, [theme, applyThemeToDOM]);

    useEffect(() => {
        // A. Determinar el tema inicial (sin esperar a eventos externos)
        const initialTheme = (() => {
            if (
                typeof localStorage !== 'undefined' &&
                localStorage.getItem('picoPreferredColorScheme')
            ) {
                return localStorage.getItem('picoPreferredColorScheme');
            }
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return DARK;
            }
            return LIGHT;
        })();

        // B. Aplicar y guardar el tema inicial
        setTheme(initialTheme);
        applyThemeToDOM(initialTheme);
        localStorage.setItem('picoPreferredColorScheme', initialTheme);

        // C. Configurar el atajo de teclado (Ctrl + d)
        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.key === 'd') {
                event.preventDefault();
                handleToggleClick(); // Llama a la función de cambio de tema
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        // Cleanup: Retirar el listener al desmontar
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [applyThemeToDOM, handleToggleClick]); // Dependencias estables

    // Si el tema aún no se ha inicializado, no renderizamos el botón para evitar flashes (FOUC)
    if (theme === null) {
        return null;
    }

    // 3. Renderizado Condicional del Icono
    const CurrentIcon = theme === DARK ? IconMoon : IconSun;

    return (
        <ButtonIcon
            id="themeToggle"
            onClick={handleToggleClick} // Usa el manejador de eventos de React
            style="secondary"
            size="md"
            {...props}
        >
            {/* El icono a renderizar basado en el estado 'theme' */}
            <CurrentIcon size={24} />
        </ButtonIcon>
    );
};

export default ThemeToggle;