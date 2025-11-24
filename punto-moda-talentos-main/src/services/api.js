const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * Función helper para hacer peticiones HTTP
 */
const fetchAPI = async (endpoint, options = {}) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        },
        ...options
    };

    try {
        const response = await fetch(`${API_URL}${endpoint}`, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || 'Error en la petición');
        }

        return data;
    } catch (error) {
        console.error(`API Error (${endpoint}):`, error);
        throw error;
    }
};

// ============================================
// PRODUCTOS
// ============================================

export const productAPI = {
    /**
     * Obtener todos los productos
     * @param {Object} filters - Filtros opcionales { category, minPrice, maxPrice, search }
     */
    getAll: async (filters = {}) => {
        const queryParams = new URLSearchParams();

        if (filters.category) queryParams.append('category', filters.category);
        if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
        if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
        if (filters.search) queryParams.append('search', filters.search);

        const query = queryParams.toString();
        const endpoint = `/products${query ? `?${query}` : ''}`;

        return await fetchAPI(endpoint);
    },

    /**
     * Obtener un producto por ID
     * @param {number} id - ID del producto
     */
    getById: async (id) => {
        return await fetchAPI(`/products/${id}`);
    },

    /**
     * Obtener categorías disponibles
     */
    getCategories: async () => {
        return await fetchAPI('/products/categories');
    },

    /**
     * Crear un nuevo producto (Admin)
     * @param {Object} productData - Datos del producto
     */
    create: async (productData) => {
        return await fetchAPI('/products', {
            method: 'POST',
            body: JSON.stringify(productData)
        });
    },

    /**
     * Actualizar un producto (Admin)
     * @param {number} id - ID del producto
     * @param {Object} productData - Datos actualizados
     */
    update: async (id, productData) => {
        return await fetchAPI(`/products/${id}`, {
            method: 'PUT',
            body: JSON.stringify(productData)
        });
    },

    /**
     * Eliminar un producto (Admin)
     * @param {number} id - ID del producto
     */
    delete: async (id) => {
        return await fetchAPI(`/products/${id}`, {
            method: 'DELETE'
        });
    }
};

// ============================================
// USUARIOS
// ============================================

export const userAPI = {
    /**
     * Obtener usuario por ID
     * @param {number} id - ID del usuario
     */
    getById: async (id) => {
        return await fetchAPI(`/users/${id}`);
    },

    /**
     * Crear un nuevo usuario (Registro)
     * @param {Object} userData - { name, email, password }
     */
    create: async (userData) => {
        return await fetchAPI('/users', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    },

    /**
     * Actualizar usuario
     * @param {number} id - ID del usuario
     * @param {Object} userData - Datos actualizados
     */
    update: async (id, userData) => {
        return await fetchAPI(`/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(userData)
        });
    }
};

// ============================================
// CARRITO
// ============================================

export const cartAPI = {
    /**
     * Obtener carrito del usuario
     * @param {number} userId - ID del usuario
     */
    get: async (userId) => {
        return await fetchAPI(`/cart/${userId}`);
    },

    /**
     * Agregar item al carrito
     * @param {number} userId - ID del usuario
     * @param {Object} itemData - { productVariantId, quantity }
     */
    addItem: async (userId, itemData) => {
        return await fetchAPI(`/cart/${userId}/items`, {
            method: 'POST',
            body: JSON.stringify(itemData)
        });
    },

    /**
     * Actualizar cantidad de un item
     * @param {number} userId - ID del usuario
     * @param {number} itemId - ID del item
     * @param {number} quantity - Nueva cantidad
     */
    updateItem: async (userId, itemId, quantity) => {
        return await fetchAPI(`/cart/${userId}/items/${itemId}`, {
            method: 'PUT',
            body: JSON.stringify({ quantity })
        });
    },

    /**
     * Eliminar item del carrito
     * @param {number} userId - ID del usuario
     * @param {number} itemId - ID del item
     */
    removeItem: async (userId, itemId) => {
        return await fetchAPI(`/cart/${userId}/items/${itemId}`, {
            method: 'DELETE'
        });
    },

    /**
     * Vaciar carrito
     * @param {number} userId - ID del usuario
     */
    clear: async (userId) => {
        return await fetchAPI(`/cart/${userId}`, {
            method: 'DELETE'
        });
    }
};

// ============================================
// ÓRDENES
// ============================================

export const orderAPI = {
    /**
     * Crear una orden desde el carrito
     * @param {number} userId - ID del usuario
     */
    create: async (userId) => {
        return await fetchAPI('/orders', {
            method: 'POST',
            body: JSON.stringify({ userId })
        });
    },

    /**
     * Obtener órdenes de un usuario
     * @param {number} userId - ID del usuario
     */
    getUserOrders: async (userId) => {
        return await fetchAPI(`/orders/user/${userId}`);
    },

    /**
     * Obtener una orden específica
     * @param {number} orderId - ID de la orden
     */
    getById: async (orderId) => {
        return await fetchAPI(`/orders/${orderId}`);
    }
};

// Exportar todo en un objeto
export default {
    products: productAPI,
    users: userAPI,
    cart: cartAPI,
    orders: orderAPI
};
