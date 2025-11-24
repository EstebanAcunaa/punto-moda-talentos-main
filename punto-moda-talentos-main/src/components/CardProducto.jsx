import { useState } from "react";
import ButtonIcon from "./ButtonIcon";
import Button from "./Button";
import { IconArrowRight, IconDiscount, IconDiscount2, IconHeart, IconHeartFilled, IconShoppingCart, IconShoppingCartPlus } from "@tabler/icons-react";
import Chip from "./Chip";

const CardProducto = ({ producto }) => {
    const [liked, setLiked] = useState(false);

    const handleLike = () => {
        setLiked(!liked);
    }

    // Destructure with defaults based on JSON structure
    const {
        nombre = "Nombre del Producto",
        precio = { regular: 0, oferta: null },
        imgs = [{
            url: "/images/productos/remera.png",
            alt: "Producto"
        }],
        slug = "",
        chip = {
            visible: false,
            label: "",
            style: ""
        }
    } = producto || {};

    const href = `/productos/${slug}`;
    const precioRegular = precio.regular;
    const precioOferta = precio.oferta;
    const tieneOferta = precioOferta !== null && precioOferta < precioRegular;

    return (
        <article className="relative p-2 flex flex-col gap-2 overflow-hidden rounded-3xl shadow-sm bg-background-100 dark:bg-background-900 outline-1 outline-background-300 dark:outline-background-700">
            <header className="relative rounded-2xl w-full aspect-3/4 overflow-hidden">
                <img
                    src={imgs[0].url}
                    alt={imgs[0].alt}
                    className="object-cover w-full h-full hover:scale-[101%] transition-transform duration-500" />
                {
                    chip.visible &&
                    <span className="absolute top-2 left-2">
                        <Chip style={chip.style} selection={true}>
                            {chip.label}
                        </Chip>
                    </span>
                }
                <ButtonIcon
                    onClick={handleLike}
                    style="secondary"
                    className="absolute top-2 right-2 group">
                    {liked
                        ? <IconHeartFilled className="text-danger-600" />
                        : <IconHeart className="group-hover:text-danger-600 group-hover:fill-danger-600" />}
                </ButtonIcon>
            </header>
            <main className="p-2">
                <h2 className="texto-title text-text-900 dark:text-text-100 line-clamp-1">
                    {nombre}
                </h2>
                <div className="flex flex-row gap-2 items-center">
                    {tieneOferta ? (
                        <>
                            <span className="texto-label md:texto-title text-primary-600 dark:text-primary-400 line-through opacity-75">
                                ${precioRegular}
                            </span>
                            <span className="flex flex-row gap-1 items-center md:texto-headline texto-title text-primary-600 dark:text-primary-400">
                                ${precioOferta}
                                <IconDiscount2 size={20} />
                            </span>
                        </>
                    ) : (
                        <span className="md:texto-headline texto-title text-primary-600 dark:text-primary-400">
                            ${precioRegular}
                        </span>
                    )}
                </div>
            </main>
            <footer className="flex flex-row gap-2 p-2">

                <ButtonIcon
                    style="tertiary"
                >
                    <IconShoppingCartPlus />
                </ButtonIcon>

                <Button
                    href={href}
                    style="primary"
                    iconRight={<IconArrowRight />}
                    className="w-full"
                >
                    Comprar
                </Button>
            </footer>
        </article >
    )
}

export default CardProducto;