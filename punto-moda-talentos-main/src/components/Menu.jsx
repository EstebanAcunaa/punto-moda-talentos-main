import React from 'react';
import MenuItem from './MenuItem';
import Divider from './Divider';

const Menu = ({ children, className = "" }) => {

    // Nota: La estructura <a class="flex flex-col"> del Astro original
    // se elimina, ya que en React los eventos se gestionan directamente en el MenuItem.

    return (
        <div
            className={`flex max-w-md w-full flex-col gap-2 rounded-xl bg-background-100 py-2 outline-1 outline-background-300 shadow-md dark:bg-background-900 dark:outline-background-700 ${className}`}
        >
            {children}
        </div>
    );
};

export default Menu;