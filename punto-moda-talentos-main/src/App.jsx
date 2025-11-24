import Navbar from '/src/section/Navbar'
import { Routes, Route } from 'react-router-dom'
import Productos from './pages/Productos.jsx'
import Index from './pages/Index.jsx'
import DetalleProducto from './pages/Producto.jsx'
import { UserProvider, useUser } from './context/UserContext'
import { CartProvider } from './context/CartContext'

function AppContent() {
    const { user } = useUser();

    return (
        <>
            <Navbar user={user ? {
                isLoggedIn: true,
                name: user.name,
                nickname: user.email
            } : {
                isLoggedIn: false
            }} />
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/productos" element={<Productos />} />
                <Route path="/productos/:slug" element={<DetalleProducto />} />
            </Routes>
        </>
    )
}

function AppWithProviders() {
    const { user } = useUser();

    return (
        <CartProvider userId={user?.id}>
            <AppContent />
        </CartProvider>
    );
}

function App() {
    return (
        <UserProvider>
            <AppWithProviders />
        </UserProvider>
    )
}

export default App
