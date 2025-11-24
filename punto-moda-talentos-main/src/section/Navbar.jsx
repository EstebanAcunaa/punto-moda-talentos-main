import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
// --- Importaciones necesarias ---
import LogoPagina from '/src/components/LogoPagina';
import Button from '/src/components/Button';
import ButtonIcon from '/src/components/ButtonIcon';
import Avatar from '/src/components/Avatar';
import ButtonTheme from '/src/components/ButtonTheme';
import { IconMenu2, IconSearch, IconX, IconLogout, IconClothesRack, IconShoeOff, IconShirt, IconShoe, IconPerfume } from '@tabler/icons-react';
import Menu from '/src/components/Menu';
import MenuItem from '/src/components/MenuItem';
import Divider from '/src/components/Divider';
import MenuSection from '../components/MenuSection';

const Navbar = ({ currentPage, user, ...props }) => {
    // 1. ESTADO: Controla la visibilidad del menú móvil.
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // 2. USE MEMO: Genera los botones de autenticación condicionalmente (DESKTOP).
    const authControlsDesktop = useMemo(() => {
        if (user?.isLoggedIn) {
            // USUARIO AUTENTICADO: Muestra el Avatar
            return (
                <li className="flex justify-center gap-3">
                    <Link to="/perfil">
                        <Avatar
                            img={user.img}
                            name={user.name}
                        />
                    </Link>
                </li>
            );
        } else {
            return (
                <li className="flex flex-row gap-3">
                    <Button style="secondary" href="/iniciar-sesion" className="">
                        Iniciar Sesión
                    </Button>
                    <Button style="primary" href="/registrarse">
                        Registrarse
                    </Button>
                </li>
            );
        }
    }, [user]);

    // 3. CONTENIDO DEL MENÚ MÓVIL
    const mobileMenuContent = useMemo(() => {
        if (user?.isLoggedIn) {
            return (
                <MenuSection title="Perfil">
                    <MenuItem
                        avatar={{ img: user.img, name: user.name }}
                        text={user.name}
                        textHelp={user.nickname || "@ " + user.name}
                        href="/perfil"
                        button={
                            <ButtonIcon
                                style="danger"
                                onClick={() => setIsMenuOpen(false)}
                                href="/logout"
                            >
                                <IconLogout size={20} />
                            </ButtonIcon>
                        }
                    />
                </MenuSection>

            );
        } else {
            return (
                <MenuSection title="Perfil">
                    <MenuItem
                        button={
                            <Button
                                style="secondary"
                                href="/iniciar-sesion"
                            >
                                Iniciar Sesión
                            </Button>
                        }
                    />
                    <MenuItem
                        button={
                            <Button
                                style="primary"
                                href="/registrarse"
                            >
                                Registrarse
                            </Button>
                        }
                    />
                </MenuSection>
            );
        }
    }, [user]);

    // Botón de búsqueda (Desktop)
    const buscarButtonDesktop = (
        <li>
            <Button style="tertiary" href="/buscar" iconRight={<IconSearch size={24} />}>
                Buscar
            </Button>
        </li>
    );

    return (
        <header
            // Estructura principal: Flex container
            className="relative flex w-full flex-wrap items-center justify-between rounded-3xl bg-background-100 p-2.5 shadow-xl outline-1 outline-background-300 dark:outline-background-700 dark:bg-background-900"
            {...props}
        >
            {/* 1. LOGO */}
            <LogoPagina />

            {/* 2. CONTROLES MÓVIL (Tema + Hamburguesa) */}
            <div className="flex items-center gap-2 md:hidden">
                <ButtonTheme />
                <ButtonIcon
                    style="primary"
                    size="md"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
                </ButtonIcon>
            </div>

            {/* 3. MENÚ MÓVIL (Absoluto) */}
            {isMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-full max-w-xs z-50 px-2 md:hidden">
                    <Menu>
                        {mobileMenuContent}
                        <MenuSection>
                            <MenuItem
                                text="Buscar"
                                iconLeft={<IconSearch size={20} />}
                                href="/buscar"
                            />
                        </MenuSection>
                        <MenuSection title="Categorias">
                            <MenuItem
                                text="Remeras"
                                iconLeft={<IconShirt size={20} />}
                                href="/remeras"
                            />
                            <MenuItem
                                text="Perfumes"
                                iconLeft={<IconPerfume size={20} />}
                                href="/perfumes"
                            />
                            <MenuItem
                                text="Zapatillas"
                                iconLeft={<IconShoe size={20} />}
                                href="/zapatillas"
                            />
                        </MenuSection>
                    </Menu>
                </div>
            )}

            {/* 4. MENÚ DE NAVEGACIÓN (DESKTOP) */}
            <nav className="hidden md:block">
                <ul className="flex items-center gap-4">
                    {buscarButtonDesktop}
                    {authControlsDesktop}
                    <li>
                        <ButtonTheme />
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;