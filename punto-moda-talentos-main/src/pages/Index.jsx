import Chip from "../components/Chip";
import ListaProductos from "../components/ListaProductos";
import BentoHero from "../section/BentoHero";
import MarcasCarrusel from "../section/MarcasCarrusel";
import productos from "../data/productos.json";

const Index = () => {
    return (
        <>
            <BentoHero />
            <MarcasCarrusel />
            <ListaProductos productos={productos.filter(p => p.stock.disponible > 10)} titulo="Nuevos Llegados" />
        </>)
}

export default Index;
