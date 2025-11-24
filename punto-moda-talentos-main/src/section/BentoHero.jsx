import { IconArrowRight } from "@tabler/icons-react"
import Button from "../components/Button"
import ButtonIcon from "../components/ButtonIcon"

const BentoHero = () => {
    const productos = [
        {
            name: "Remeras",
            img: "/image/productos/remeras.png",
            href: "/remeras"
        },
        {
            name: "Perfumes",
            img: "/image/productos/perfumes.jpg",
            href: "/perfumes"
        },
        {
            name: "Zapatillas",
            img: "/image/productos/zapatillas.jpg",
            href: "/zapatillas"
        },
    ]

    return (
        <section className="grid grid-cols-3 lg:grid-cols-6 lg:grid-rows-6 gap-3 lg:h-[calc(100vh-114px)]">
            <span className="col-span-3 lg:row-span-4 bg-primary-300 rounded-3xl p-6 shadow-sm flex flex-col gap-4 dark:bg-primary-800">
                <h1 className="lg:text-4xl xl:text-6xl leading-tight text-3xl font-family-base font-bold text-text-900 dark:text-text-200">
                    La Esencia de lo Auténtico. Descubre la Colección.
                </h1>
                <p className="text-display text-text-800 dark:text-text-200">
                    Descubre nuestra selección atemporal de remeras, zapatillas y fragancias. Piezas con la pátina de la historia, diseñadas para la vida moderna.
                </p>
                <Button
                    style="primary"
                    href="/productos"
                    iconRight={<IconArrowRight size={24} />}
                >
                    Ver colección
                </Button>
            </span>
            <span className="hidden lg:block col-span-3 lg:row-span-4 from-primary-400 to-secondary-400 dark:from-primary-600 dark:to-secondary-600 bg-linear-to-br rounded-3xl shadow-sm">
                <img src="/image/imagenBento.png" className="h-full w-full object-contain" alt="Una mujer con camiseta azul y vaqueros junto a un hombre con sudadera naranja con capucha y pantalones negros, ambos de pie sobre un fondo transparente a cuadros." />
            </span>
            {/* Productos */}
            {/* --- 3. PRODUCT CARDS (Rediseñado) --- */}
            {
                productos.map((producto, index) => (
                    <div
                        key={index}
                        className="
                            relative group overflow-hidden rounded-3xl shadow-sm
                            lg:col-span-2 lg:row-span-2 
                            min-h-[200px]
                            flex flex-col justify-between p-5
                        "
                    >
                        {/* A. IMAGEN DE FONDO: Ocupa todo el espacio */}
                        <img
                            src={producto.img}
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 z-0"
                            alt={producto.name}
                        />

                        {/* B. DEGRADADO OSCURO: Para que se lea el texto blanco siempre */}
                        <div className="absolute inset-0 bg-linear-to-b from-background-900/70 via-background-900/20 to-background-900/60 z-10" />

                        {/* C. TÍTULO (Arriba) */}
                        <h2 className="relative z-20 texto-title text-text-100">
                            {producto.name}
                        </h2>

                        {/* D. BOTÓN (Abajo) */}
                        <div className="relative z-20 w-full">
                            {/* Asumimos que tu componente Button acepta className para ancho completo */}
                            <div className="w-full flex">
                                <Button
                                    href={producto.href}
                                    style="secondary"
                                    iconRight={<IconArrowRight size={24} />}
                                    className="w-full"
                                >
                                    Ver
                                </Button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </section>
    )
}

export default BentoHero