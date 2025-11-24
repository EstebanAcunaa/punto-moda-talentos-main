import { useState } from 'react'
import Navbar from '/src/section/Navbar'
import { Routes, Route } from 'react-router-dom'
import Productos from './pages/Productos.jsx'
import Index from './pages/Index.jsx'
import DetalleProducto from './pages/Producto.jsx'

function App() {
    return (
        <>
            <Navbar user={{ isLoggedIn: true, name: "Matias Solis Schneeberger", nickname: "@MatiasSS100605" }} />
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/productos" element={<Productos />} />
                <Route path="/productos/:slug" element={<DetalleProducto />} />
            </Routes>
        </>
    )
}

export default App
