import React from 'react';

const MarcasCarrusel = () => {
    const brands = [
        { name: "Velocity Kicks", logo: "/image/marcas/image 1.png" },
        { name: "Filo Di Moda", logo: "/image/marcas/image 2.png" },
        { name: "Roses D'Égypte", logo: "/image/marcas/image 3.png" },
        { name: "Atelier Noir", logo: "/image/marcas/image 4.png" },
        { name: "L'air de la Rose", logo: "/image/marcas/image 5.png" },
    ];

    return (
        <section className="py-8 flex flex-col gap-3 overflow-hidden bg-primary-200 dark:bg-primary-900 rounded-3xl">
            <header className="container mx-auto px-4 mb-8 text-center">
                <h3 className="texto-headline text-text-900 dark:text-text-100">
                    Nuestras Marcas
                </h3>
            </header>

            {/* Carrusel de marcas */}
            <div className="relative flex w-full overflow-hidden mask-gradient-x">
                {/* Grupo 1 */}
                <div className="flex animate-infinite-scroll whitespace-nowrap gap-6 pr-6">
                    {brands.map((brand, index) => (
                        <BrandItem key={`g1-${index}`} brand={brand} />
                    ))}
                </div>

                {/* Grupo 2 (Duplicado exacto para el efecto infinito) */}
                <div className="flex animate-infinite-scroll whitespace-nowrap gap-6 pr-6" aria-hidden="true">
                    {brands.map((brand, index) => (
                        <BrandItem key={`g2-${index}`} brand={brand} />
                    ))}
                </div>
            </div>
        </section>
    );
};

// Subcomponente para cada tarjeta de marca
const BrandItem = ({ brand }) => (
    <div className="h-28 aspect-video flex items-center justify-center rounded-xl border border-text-200/10 transition-all duration-300 cursor-pointer">
        {brand.logo ? (
            <img src={brand.logo} alt={brand.name} className="h-full w-auto object-cover" />
        ) : (
            <span className="text-lg font-bold text-text-500 group-hover:text-white transition-colors">{brand.name}</span>
        )}
    </div>
);

export default MarcasCarrusel;