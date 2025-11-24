import { useState, useEffect } from 'react';
import CardProducto from "../components/CardProducto";
import ListaProductos from "../components/ListaProductos";
import FiltrosProductos from "../components/FiltrosProductos";
import productosData from "../data/productos.json";
import Button from '../components/Button';

function Productos() {
    const [productos, setProductos] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filters, setFilters] = useState({});

    useEffect(() => {
        // Load initial data
        setProductos(productosData);
        setFilteredProducts(productosData);
    }, []);

    useEffect(() => {
        let result = productos;

        // Filter by Category
        if (filters.categoria) {
            result = result.filter(p => p.categoria === filters.categoria);
        }

        // Filter by Talle
        if (filters.talle) {
            result = result.filter(p =>
                p.variantes?.some(v =>
                    v.tipo === 'talle' && v.opciones.includes(filters.talle)
                )
            );
        }

        // Filter by Color
        if (filters.color) {
            result = result.filter(p =>
                p.variantes?.some(v =>
                    v.tipo === 'color' && v.opciones.includes(filters.color)
                )
            );
        }

        // Filter by Price
        if (filters.minPrice) {
            result = result.filter(p => {
                const price = p.precio.oferta || p.precio.regular;
                return price >= Number(filters.minPrice);
            });
        }
        if (filters.maxPrice) {
            result = result.filter(p => {
                const price = p.precio.oferta || p.precio.regular;
                return price <= Number(filters.maxPrice);
            });
        }

        setFilteredProducts(result);
    }, [filters, productos]);

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {/* Sidebar Filters */}
            <aside className="row-span-2">
                <FiltrosProductos
                    productos={productos}
                    filters={filters}
                    setFilters={setFilters}
                />
            </aside>

            {/* Product List */}

            <header className="sm:col-start-2 sm:col-end-6 texto-headline text-center text-text-800 dark:text-text-200">
                <h2>
                    Resultados
                </h2>
            </header>


            <article className="sm:col-start-2 sm:col-end-6 sm:row-start-2 grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {filteredProducts.map((producto, index) => (
                    <CardProducto key={index} producto={producto} />
                ))}
                {filteredProducts.length === 0 && (
                    <span className="col-span-6 flex flex-col items-center justify-center gap-4 py-10 text-gray-500 dark:text-gray-400">
                        <h3 className="texto-title text-text-800 dark:text-text-400">
                            No se encontraron productos con los filtros seleccionados.
                        </h3>
                        <Button
                            style="tertiary"
                            onClick={() => setFilters({})}
                        >
                            Limpiar filtros
                        </Button>
                    </span>
                )}
            </article>

        </section>
    );
}

export default Productos;