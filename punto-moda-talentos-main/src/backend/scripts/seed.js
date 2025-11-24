import sequelize from '../index.js';
import { User, Product, ProductVariant, VariantAttribute, ProductImage, Review } from '../models/asociaciones.js';

// --- DATOS DEL CATÁLOGO ---
const productsData = [
    // --- CATEGORÍA: REMERAS ---
    {
        name: 'Remera Basic Cotton',
        description: 'Remera 100% algodón peinado, corte clásico.',
        category: 'remera',
        basePrice: 15000,
        images: [
            { url: 'https://via.placeholder.com/300/000000/FFFFFF?text=Remera+Negra', color: 'Negro' },
            { url: 'https://via.placeholder.com/300/FFFFFF/000000?text=Remera+Blanca', color: 'Blanco' }
        ],
        variants: [
            { color: 'Negro', sizes: ['S', 'M', 'L', 'XL'], stock: 20 },
            { color: 'Blanco', sizes: ['S', 'M', 'L'], stock: 15 }
        ]
    },
    {
        name: 'Remera Oversize Street',
        description: 'Estilo urbano, hombros caídos y tela pesada.',
        category: 'remera',
        basePrice: 22000,
        images: [
            { url: 'https://via.placeholder.com/300/BDBDBD/000000?text=Oversize+Gris', color: 'Gris' },
            { url: 'https://via.placeholder.com/300/2E86C1/FFFFFF?text=Oversize+Azul', color: 'Azul Marino' }
        ],
        variants: [
            { color: 'Gris', sizes: ['M', 'L', 'XL'], stock: 10 },
            { color: 'Azul Marino', sizes: ['M', 'L'], stock: 8 }
        ]
    },
    {
        name: 'Remera Estampada Vintage',
        description: 'Diseño retro lavado a la piedra.',
        category: 'remera',
        basePrice: 18500,
        images: [
            { url: 'https://via.placeholder.com/300/800000/FFFFFF?text=Vintage+Bordo', color: 'Bordó' }
        ],
        variants: [
            { color: 'Bordó', sizes: ['S', 'M', 'L'], stock: 5 }
        ]
    },

    // --- CATEGORÍA: PANTALONES ---
    {
        name: 'Jean Slim Fit Dark',
        description: 'Jean elastizado corte ajustado, color oscuro.',
        category: 'pantalon',
        basePrice: 45000,
        images: [
            { url: 'https://via.placeholder.com/300/000080/FFFFFF?text=Jean+Azul', color: 'Azul Oscuro' }
        ],
        variants: [
            { color: 'Azul Oscuro', sizes: ['38', '40', '42', '44'], stock: 12 }
        ]
    },
    {
        name: 'Pantalón Cargo Explorer',
        description: 'Pantalón utilitario con múltiples bolsillos.',
        category: 'pantalon',
        basePrice: 42000,
        images: [
            { url: 'https://via.placeholder.com/300/556B2F/FFFFFF?text=Cargo+Verde', color: 'Verde Militar' },
            { url: 'https://via.placeholder.com/300/D2B48C/000000?text=Cargo+Beige', color: 'Beige' }
        ],
        variants: [
            { color: 'Verde Militar', sizes: ['40', '42', '44'], stock: 20 },
            { color: 'Beige', sizes: ['38', '40', '42'], stock: 15 }
        ]
    },
    {
        name: 'Jogger Urbano Fleece',
        description: 'Comodidad máxima para estar en casa o salir.',
        category: 'pantalon',
        basePrice: 35000,
        images: [
            { url: 'https://via.placeholder.com/300/333333/FFFFFF?text=Jogger+Negro', color: 'Negro' }
        ],
        variants: [
            { color: 'Negro', sizes: ['S', 'M', 'L', 'XL'], stock: 30 }
        ]
    },

    // --- CATEGORÍA: ZAPATILLAS ---
    {
        name: 'Zapatillas Runner Pro',
        description: 'Ideales para correr o entrenamiento ligero.',
        category: 'zapatilla',
        basePrice: 85000,
        images: [
            { url: 'https://via.placeholder.com/300/FF4500/FFFFFF?text=Runner+Naranja', color: 'Naranja' },
            { url: 'https://via.placeholder.com/300/000000/FFFFFF?text=Runner+Negra', color: 'Negro' }
        ],
        variants: [
            { color: 'Naranja', sizes: ['39', '40', '41', '42'], stock: 8 },
            { color: 'Negro', sizes: ['40', '41', '42', '43', '44'], stock: 10 }
        ]
    },
    {
        name: 'Sneakers Classic Canvas',
        description: 'Estilo clásico de lona, suela de goma.',
        category: 'zapatilla',
        basePrice: 60000,
        images: [
            { url: 'https://via.placeholder.com/300/FFFFFF/000000?text=Canvas+Blanco', color: 'Blanco' }
        ],
        variants: [
            { color: 'Blanco', sizes: ['36', '37', '38', '39', '40'], stock: 25 }
        ]
    },
    {
        name: 'Botas Urban Leather',
        description: 'Botas de cuero sintético para invierno.',
        category: 'zapatilla',
        basePrice: 95000,
        images: [
            { url: 'https://via.placeholder.com/300/8B4513/FFFFFF?text=Bota+Marron', color: 'Marrón' }
        ],
        variants: [
            { color: 'Marrón', sizes: ['40', '41', '42'], stock: 5 }
        ]
    }
];

const seedDatabase = async () => {
    try {
        // 1. Limpiar DB
        await sequelize.sync({ force: true });
        console.log('🗑️  Base de datos limpiada.');

        // 2. Crear Usuarios
        const user = await User.create({
            name: 'Cliente Feliz',
            email: 'cliente@test.com',
            password: 'password123'
        });
        console.log('👤 Usuario creado.');

        // 3. Bucle Mágico para crear Productos
        console.log('📦 Cargando catálogo de productos...');

        for (const pData of productsData) {
            // A. Crear Producto Padre
            const product = await Product.create({
                name: pData.name,
                description: pData.description,
                price: pData.basePrice, // Precio de referencia
                category: pData.category
            });

            // B. Cargar Imágenes
            for (const img of pData.images) {
                await ProductImage.create({
                    product_id: product.id,
                    image_url: img.url,
                    color: img.color
                });
            }

            // C. Generar Variantes (Combinación Color + Talle)
            for (const variantConfig of pData.variants) {
                for (const size of variantConfig.sizes) {
                    // Generar SKU único (Ej: REM-BAS-NEG-S)
                    const skuCode = `${pData.name.substring(0, 3).toUpperCase()}-${variantConfig.color.substring(0, 3).toUpperCase()}-${size}`;

                    // Crear la variante física
                    const newVariant = await ProductVariant.create({
                        product_id: product.id,
                        sku: skuCode,
                        price: pData.basePrice, // Podrías variar el precio si quisieras
                        stock: variantConfig.stock
                    });

                    // Crear Atributo: Color
                    await VariantAttribute.create({
                        product_variant_id: newVariant.id,
                        attribute_name: 'Color',
                        attribute_value: variantConfig.color
                    });

                    // Crear Atributo: Talle
                    await VariantAttribute.create({
                        product_variant_id: newVariant.id,
                        attribute_name: 'Talle',
                        attribute_value: size
                    });
                }
            }
        }

        console.log(`✅ Se insertaron ${productsData.length} productos padre con todas sus variantes.`);
        console.log('🚀 ¡Seed completado con éxito!');
        process.exit(0);

    } catch (error) {
        console.error('❌ Error fatal:', error);
        process.exit(1);
    }
};

seedDatabase();