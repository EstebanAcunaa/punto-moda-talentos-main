import { User, Cart } from '../models/asociaciones.js';

// GET /api/users/:id - Obtener usuario por ID
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id, {
            attributes: ['id', 'name', 'email', 'created_at'],
            include: [
                {
                    model: Cart,
                    attributes: ['id']
                }
            ]
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'Usuario no encontrado'
            });
        }

        res.json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({
            success: false,
            error: 'Error al obtener usuario'
        });
    }
};

// POST /api/users - Crear un nuevo usuario (Registro)
export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validación básica
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                error: 'Nombre, email y contraseña son requeridos'
            });
        }

        // Verificar si el email ya existe
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                error: 'El email ya está registrado'
            });
        }

        // TODO: Hashear la contraseña con bcrypt antes de guardar
        const user = await User.create({
            name,
            email,
            password // En producción, usar bcrypt.hash(password, 10)
        });

        // Crear carrito para el usuario
        await Cart.create({
            user_id: user.id
        });

        res.status(201).json({
            success: true,
            data: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            success: false,
            error: 'Error al crear usuario'
        });
    }
};

// PUT /api/users/:id - Actualizar usuario
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'Usuario no encontrado'
            });
        }

        await user.update({ name, email });

        res.json({
            success: true,
            data: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({
            success: false,
            error: 'Error al actualizar usuario'
        });
    }
};
