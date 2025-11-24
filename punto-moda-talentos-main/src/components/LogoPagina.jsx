// Importa el icono IconShoppingBag de @tabler/icons-react
import { IconShoppingBag } from '@tabler/icons-react';

/**
 * Componente de enlace a la página principal de "Punto Moda".
 * Utiliza react-router-dom para la navegación interna.
 */
const LogoPagina = () => {
    return (
        <a
            href="/"
            className="bg-primary-600 dark:bg-primary-400 rounded-full p-2.5 flex flex-row gap-2.5 items-center justify-center self-stretch shrink-0 relative overflow-hidden h-min dark:text-text-800 text-text-200"
            id="logo"
        >
            <IconShoppingBag size={20} />

            <p className="font-[Montserrat] text-sm leading-4 tracking-wide font-bold">
                Punto Moda
            </p>
        </a>
    );
};

export default LogoPagina;