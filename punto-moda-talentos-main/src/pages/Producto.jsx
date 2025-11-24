import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import productosData from '../data/productos.json';
import Button from '../components/Button';
import { IconShoppingCartPlus, IconHeart, IconHeartFilled, IconArrowLeft, IconCheck, IconX } from '@tabler/icons-react';
import ButtonIcon from '../components/ButtonIcon';
import Chip from '../components/Chip';
import Avatar from '../components/Avatar';
import ListaProductos from '../components/ListaProductos';

function Producto() {
    const { slug } = useParams();
    const [producto, setProducto] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [liked, setLiked] = useState(false);
    const [selectedVariant, setSelectedVariant] = useState(null);

    useEffect(() => {
        const foundProduct = productosData.find(p => p.slug === slug);
        setProducto(foundProduct);
    }, [slug]);

    if (!producto) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
                <h2 className="texto-headline text-text-800 dark:text-text-200">Producto no encontrado</h2>
                <Button href="/productos" style="primary" iconLeft={<IconArrowLeft />}>
                    Volver a productos
                </Button>
            </div>
        );
    }

    const { nombre, precio, imgs, description, chip, stock, variantes } = producto;
    const precioRegular = precio.regular;
    const precioOferta = precio.oferta;
    const tieneOferta = precioOferta !== null && precioOferta < precioRegular;

    return (
        <section className="container">
            <Button href="/productos" style="tertiary" iconLeft={<IconArrowLeft />} className="mb-6">
                Volver
            </Button>

            <article className="grid relative grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-6">
                {/* Images Section */}
                <aside className="relative md:sticky top-3 self-start col-span-4 md:col-span-3 sm:col-span-6 lg:col-span-5 w-full gap-3 grid grid-cols-subgrid">

                    {/* Main Image */}
                    <div className="col-span-4 md:col-span-3 sm:col-start-1 sm:col-end-6 lg:col-span-5 xl:col-start-2 relative aspect-3/4 w-full overflow-hidden rounded-3xl bg-background-100 dark:bg-background-900 outline-2 outline-background-300 dark:outline-background-700">
                        <img
                            src={imgs[selectedImage].url}
                            alt={imgs[selectedImage].alt}
                            className="w-full h-full object-cover"
                        />
                        {chip.visible && (
                            <div className="absolute top-4 left-4">
                                <Chip style={chip.style} selection={true}>
                                    {chip.label}
                                </Chip>
                            </div>
                        )}
                        <ButtonIcon
                            onClick={() => setLiked(!liked)}
                            style="secondary"
                            className="absolute top-4 right-4"
                        >
                            {liked ? <IconHeartFilled className="text-danger-600" /> : <IconHeart />}
                        </ButtonIcon>
                    </div>

                    {/* Images */}
                    <div className="relative col-span-4 gap-2 flex flex-row sm:flex-col sm:col-start-6 md:flex-row md:col-span-3 md:overflow-x-scroll lg:overflow-x-auto lg:col-span-5 xl:col-start-1 xl:row-start-1 xl:col-span-1 xl:flex-col">
                        {imgs.map((img, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`relative p-0 w-full max-h-24 aspect-square rounded-xl transition-all border-2 border-background-300 dark:border-background-700
                                    ${selectedImage === index
                                        ? 'border-primary-500 opacity-100'
                                        : 'opacity-70 hover:opacity-100'
                                    }`}
                            >
                                <img
                                    src={img.url}
                                    alt={img.alt}
                                    className="w-full h-full object-cover rounded-xl"
                                />
                            </button>
                        ))}
                    </div>
                </aside>

                {/* Details Section */}
                <main className="col-span-4 sm:col-span-6 md:col-span-5 xl:col-span-7 flex flex-col gap-6">
                    {/* Product Details Card */}
                    <section className="flex flex-col gap-6 bg-background-100 dark:bg-background-900 p-4 rounded-3xl outline-2 outline-background-300 dark:outline-background-700">
                        <header>
                            <h1 className="texto-display text-primary-600 dark:text-primary-400 mb-2">
                                {nombre}
                            </h1>
                            <section className="flex items-center gap-3">
                                {tieneOferta ? (
                                    <>
                                        <span className="texto-headline text-secondary-600 dark:text-secondary-400">
                                            ${precioOferta.toLocaleString('es-AR')}
                                        </span>
                                        <span className="texto-title text-text-400 line-through">
                                            ${precioRegular.toLocaleString('es-AR')}
                                        </span>
                                    </>
                                ) : (
                                    <span className="texto-headline text-secondary-600 dark:text-secondary-400">
                                        ${precioRegular.toLocaleString('es-AR')}
                                    </span>
                                )}
                            </section>
                        </header>

                        <div className="prose dark:prose-invert max-w-none text-text-600 dark:text-text-300">
                            <p>
                                {producto.descripcion}
                            </p>
                        </div>

                        <div className="space-y-4">
                            {producto.variantes?.map((variante, index) => (
                                <div key={index} className="flex flex-col gap-2">
                                    <h3 className="texto-title text-text-800 dark:text-text-200 mb-2 capitalize">
                                        {variante.tipo}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {variante.opciones.map((opcion, idx) => (
                                            <Chip
                                                key={idx}
                                                selection={selectedVariant === opcion}
                                                onClick={() => selectedVariant === opcion ? (setSelectedVariant(null)) : (setSelectedVariant(opcion))}
                                                className="cursor-pointer"
                                                iconLeft={selectedVariant === opcion && <IconCheck size={16} />}
                                            >
                                                {opcion}
                                            </Chip>
                                        ))}
                                    </div>

                                </div>
                            ))}
                        </div>

                        <div className="flex gap-3 mt-4">
                            <Button style="primary" className="flex-1" iconLeft={<IconShoppingCartPlus />}>
                                Agregar al carrito
                            </Button>
                        </div>

                        {stock && (
                            <div className={`text-sm ${stock.bajo_stock ? 'text-warning-600' : 'text-success-600'}`}>
                                {stock.bajo_stock ? '¡Últimas unidades!' : 'Stock disponible'} ({stock.disponible} unidades)
                            </div>
                        )}
                    </section>

                    {/* Opinions Section */}
                    <section className="flex flex-col gap-4 bg-background-100 dark:bg-background-900 p-6 rounded-3xl outline-2 outline-background-300 dark:outline-background-700">
                        <header>
                            <h2 className="texto-headline text-primary-600 dark:text-primary-400">Opiniones del producto</h2>
                        </header>

                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex flex-col items-center">
                                <span className="text-4xl font-bold text-primary-600">4.8</span>
                                <div className="flex text-warning-400" aria-label="4.8 de 5 estrellas">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <IconHeartFilled key={star} size={20} />
                                    ))}
                                </div>
                                <span className="text-sm text-text-500">Based on 128 reviews</span>
                            </div>

                            <div className="flex-1 space-y-2">
                                {[5, 4, 3, 2, 1].map((rating) => (
                                    <div key={rating} className="flex items-center gap-2">
                                        <span className="text-sm font-medium w-3">{rating}</span>
                                        <div className="flex-1 h-2 bg-background-200 rounded-full overflow-hidden" role="progressbar" aria-valuenow={rating === 5 ? 70 : rating === 4 ? 20 : 5} aria-valuemin="0" aria-valuemax="100">
                                            <div
                                                className="h-full bg-primary-500 rounded-full"
                                                style={{ width: `${rating === 5 ? 70 : rating === 4 ? 20 : 5}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            {/* Placeholder reviews */}
                            {[1, 2].map((review) => (
                                <article key={review} className="border-b border-background-200 pb-4 last:border-0 last:pb-0">
                                    <header className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <Avatar
                                                name={`Usuario ${review}`}
                                                size="small"
                                            />
                                            <span className="font-medium">{`Usuario ${review}`}</span>
                                        </div>
                                        <time className="text-sm text-text-400">Hace 2 días</time>
                                    </header>
                                    <p className="text-text-600 dark:text-text-300">
                                        Excelente producto, muy buena calidad y llegó rápido. Totalmente recomendado.
                                    </p>
                                </article>
                            ))}
                        </div>

                        <Button style="secondary" className="w-full mt-2">
                            Ver todas las opiniones
                        </Button>
                    </section>

                    {/* Q&A Section */}
                    <section className="flex flex-col gap-4 bg-background-100 dark:bg-background-900 p-6 rounded-3xl outline-2 outline-background-300 dark:outline-background-700">
                        <header>
                            <h2 className="texto-headline text-primary-600 dark:text-primary-400">Preguntas y respuestas</h2>
                        </header>

                        <form className="flex gap-2 mb-4" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="text"
                                placeholder="Escribí una pregunta..."
                                className="flex-1 px-4 py-2 rounded-xl bg-background-50 dark:bg-background-800 border border-background-300 dark:border-background-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                aria-label="Escribe tu pregunta"
                            />
                            <Button style="primary" type="submit">
                                Preguntar
                            </Button>
                        </form>

                        <div className="space-y-6">
                            {[1, 2, 3].map((qa) => (
                                <article key={qa} className="flex flex-col gap-2">
                                    <div className="flex gap-2">
                                        <span className="font-bold text-text-900 dark:text-text-100" aria-hidden="true">P:</span>
                                        <h3 className="text-text-800 dark:text-text-200 font-medium text-base m-0">
                                            ¿Tienen stock en talle M?
                                        </h3>
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        <span className="font-bold text-text-500" aria-hidden="true">R:</span>
                                        <p className="text-text-600 dark:text-text-400">
                                            Hola! Sí, tenemos stock disponible en talle M. ¡Esperamos tu compra!
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </div>

                        <Button style="tertiary" className="w-full mt-2">
                            Ver más preguntas
                        </Button>
                    </section>
                </main>
            </article>

            <ListaProductos
                titulo={"Productos relacionados"}
                productos={productosData.filter(p => p.categoria === producto.categoria).slice(0, 4)}
            />
        </section>
    );
}

export default Producto;
