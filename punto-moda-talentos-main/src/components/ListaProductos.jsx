import CardProducto from "./CardProducto";

const ListaProductos = ({ productos = [{
    nombre, precio, img, oferta
}], titulo }) => {
    return (
        <section className="py-8 flex flex-col gap-3">
            <header className="container mx-auto px-4 text-center">
                <h3 className="texto-headline text-text-900 dark:text-text-100">
                    {titulo}
                </h3>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {productos.map((producto, index) => (
                    <CardProducto key={index} producto={producto} />
                ))}
            </div>
        </section>
    );
};

export default ListaProductos;
