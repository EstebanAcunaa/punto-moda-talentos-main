import { useState, useEffect } from 'react';
import Button from './Button';
import ButtonIcon from './ButtonIcon';
import Chip from './Chip';
import { IconCheck, IconChevronDown, IconFilter, IconX } from '@tabler/icons-react';

const FiltrosProductos = ({ productos, filters, setFilters }) => {
    const [talles, setTalles] = useState([]);
    const [colores, setColores] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [precioMin, setPrecioMin] = useState('');
    const [precioMax, setPrecioMax] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Extract unique options from products
        const uniqueTalles = new Set();
        const uniqueColores = new Set();
        const uniqueCategorias = new Set();

        productos.forEach(producto => {
            uniqueCategorias.add(producto.categoria);
            producto.variantes?.forEach(variante => {
                if (variante.tipo === 'talle') {
                    variante.opciones.forEach(opcion => uniqueTalles.add(opcion));
                }
                if (variante.tipo === 'color') {
                    variante.opciones.forEach(opcion => uniqueColores.add(opcion));
                }
            });
        });

        setTalles(Array.from(uniqueTalles));
        setColores(Array.from(uniqueColores));
        setCategorias(Array.from(uniqueCategorias));
    }, [productos]);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handlePriceChange = (e, type) => {
        const value = e.target.value;
        if (type === 'min') {
            setPrecioMin(value);
            handleFilterChange('minPrice', value);
        } else {
            setPrecioMax(value);
            handleFilterChange('maxPrice', value);
        }
    };

    return (
        <aside className="w-full p-4 bg-background-100 dark:bg-background-900 rounded-3xl shadow-md h-fit outline-1 outline-background-300 dark:outline-background-700 sticky top-3 ">
            <div className="flex justify-between items-center">
                <h3 className="texto-headline text-text-800 dark:text-text-200">Filtros</h3>
                <ButtonIcon
                    style="secondary"
                    className="sm:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <IconX /> : <IconFilter />}
                </ButtonIcon>
            </div>

            <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] mt-4' : 'grid-rows-[0fr]'} sm:block sm:grid-rows-none`}>
                <div className="overflow-hidden p-0.5">
                    {/* Categoría */}
                    <div className="mb-6">
                        <h4 className="texto-title mb-2 text-text-800 dark:text-text-200">
                            Categoría
                        </h4>

                        <select
                            name="categoria"
                            className="w-full p-2 border-background-300 dark:border-background-700 rounded dark:bg-background-700 dark:text-text-200 text-text-800"
                            onChange={(e) => handleFilterChange('categoria', e.target.value)}
                            value={filters.categoria || ''}
                        >
                            <option value="">
                                Todos
                            </option>
                            <hr />
                            {categorias.map(cat => (
                                <option
                                    key={cat}
                                    value={cat}
                                    className="dark:text-text-200">
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Talles */}
                    <div className="mb-6">
                        <h4 className="texto-title mb-2 text-text-800 dark:text-text-200">Talles</h4>
                        <div className="flex flex-wrap gap-2">
                            {talles.map(talle => (
                                <Chip
                                    key={talle}
                                    selection={filters.talle === talle}
                                    onClick={() => filters.talle === talle ? (handleFilterChange('talle', '')) : (handleFilterChange('talle', talle))}
                                    className="cursor-pointer"
                                    iconLeft={filters.talle === talle && <IconCheck size={16} />}
                                >
                                    {talle}
                                </Chip>
                            ))}
                        </div>
                    </div>

                    {/* Colores */}
                    <div className="mb-6">
                        <h4 className="texto-title mb-2">Colores</h4>
                        <select
                            className="w-full p-2 border rounded"
                            onChange={(e) => handleFilterChange('color', e.target.value)}
                            value={filters.color || ''}
                        >
                            <option value="">Todos</option>
                            <hr />
                            {colores.map(color => (
                                <option key={color} value={color}>{color}</option>
                            ))}
                        </select>
                    </div>

                    {/* Precio */}
                    <div className="mb-6">
                        <h4 className="texto-title mb-2">Precio</h4>
                        <div className="flex gap-2 items-center text-secondary-800 dark:text-secondary-200">
                            <input
                                type="number"
                                placeholder="Min"
                                value={precioMin}
                                onChange={(e) => handlePriceChange(e, 'min')}
                                className="w-full bg-background-50 dark:bg-background-900 texto-lable outline-2 outline-secondary-400 dark:outline-secondary-600 p-2 rounded-xl"
                            />
                            <span className="texto-lable"> - </span>
                            <input
                                type="number"
                                placeholder="Max"
                                value={precioMax}
                                onChange={(e) => handlePriceChange(e, 'max')}
                                className="w-full bg-background-50 dark:bg-background-900 texto-lable outline-2 outline-secondary-400 dark:outline-secondary-600 p-2 rounded-xl"
                            />
                        </div>
                    </div>

                    <Button
                        onClick={() => {
                            setFilters({});
                            setPrecioMin('');
                            setPrecioMax('');
                        }}
                        style="danger"
                    >
                        Limpiar Filtros
                    </Button>
                </div>
            </div>
        </aside>
    );
};

export default FiltrosProductos;
