import { useState, useEffect } from 'react';
import CardProducto from "../components/CardProducto";
import ListaProductos from "../components/ListaProductos";
import FiltrosProductos from "../components/FiltrosProductos";
import productosData from "../data/productos.json";
import Button from '../components/Button';
import { productAPI } from '../services/api';

function Productos() {
    const [productos, setProductos] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filters, setFilters] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [useLocalData, setUseLocalData] = useState(false);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        setLoading(true);
        setError(null);

        try {
            // Intentar cargar desde la API
            const response = await productAPI.getAll();
            const apiProducts = response.data || [];

            if (apiProducts.length > 0) {
                setProductos(apiProducts);
                setFilteredProducts(apiProducts);
                setUseLocalData(false);
            } else {
                // Si no hay productos en la API, usar datos locales
                setProductos(productosData);
                setFilteredProducts(productosData);
                setUseLocalData(true);
            }
        } catch (err) {
            console.warn('No se pudo conectar con la API, usando datos locales:', err);
            // Fallback a datos locales si la API falla
            setProductos(productosData);
            setFilteredProducts(productosData);
            setUseLocalData(true);
            setError('No se pudo conectar con el servidor. Mostrando datos de ejemplo.');
        } finally {
            setLoading(false);
        }
    };

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

    if (loading) {
        return (
            <section className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="texto-headline text-text-800 dark:text-text-200 mb-4">
                        Cargando productos...
                    </div>
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                </div>
            </section>
        );
    }

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {/* Mostrar advertencia si estamos usando datos locales */}
            {useLocalData && error && (
                <div className="col-span-full bg-warning-100 dark:bg-warning-900 border border-warning-400 text-warning-800 dark:text-warning-200 px-4 py-3 rounded-lg mx-3 mt-3">
                    <p className="texto-body">{error}</p>
                </div>
            )}

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
                    <CardProducto key={producto.id || index} producto={producto} />
                ))}
                {filteredProducts.length === 0 && !loading && (
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