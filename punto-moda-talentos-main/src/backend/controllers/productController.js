import {
    Product,
    ProductVariant,
    ProductImage,
    Review,
    VariantAttribute,
    User
} from '../models/asociaciones.js';

// GET /api/products - Obtener todos los productos con filtros
export const getAllProducts = async (req, res) => {
    try {
        const { category, minPrice, maxPrice, search } = req.query;

        const where = {};

        if (category) {
            where.category = category;
        }

        if (minPrice || maxPrice) {
            where.price = {};
            if (minPrice) where.price.$gte = parseFloat(minPrice);
            if (maxPrice) where.price.$lte = parseFloat(maxPrice);
        }

        if (search) {
            where.name = { $iLike: `%${search}%` };
        }

        const products = await Product.findAll({
            where,
            include: [
                {
                    model: ProductImage,
                    attributes: ['image_url', 'color', 'is_primary']
                },
                {
                    model: ProductVariant,
                    include: [
                        {
                            model: VariantAttribute,
                            attributes: ['attribute_name', 'attribute_value']
                        }
                    ]
                },
                {
                    model: Review,
                    attributes: ['rating'],
                    include: [
                        {
                            model: User,
                            attributes: ['name']
                        }
                    ]
                }
            ],
            order: [['created_at', 'DESC']]
        });

        // Calcular rating promedio para cada producto
        const productsWithRating = products.map(product => {
            const reviews = product.Reviews || [];
            const avgRating = reviews.length > 0
                ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
                : 0;

            return {
                ...product.toJSON(),
                avgRating: avgRating.toFixed(1),
                reviewCount: reviews.length
            };
        });

        res.json({
            success: true,
            count: productsWithRating.length,
            data: productsWithRating
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({
            success: false,
            error: 'Error al obtener productos'
        });
    }
};

// GET /api/products/:id - Obtener un producto por ID
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id, {
            include: [
                {
                    model: ProductImage,
                    attributes: ['image_url', 'color', 'is_primary']
                },
                {
                    model: ProductVariant,
                    include: [
                        {
                            model: VariantAttribute,
                            attributes: ['attribute_name', 'attribute_value']
                        }
                    ]
                },
                {
                    model: Review,
                    include: [
                        {
                            model: User,
                            attributes: ['name']
                        }
                    ]
                }
            ]
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'Producto no encontrado'
            });
        }

        // Calcular rating promedio
        const reviews = product.Reviews || [];
        const avgRating = reviews.length > 0
            ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            : 0;

        res.json({
            success: true,
            data: {
                ...product.toJSON(),
                avgRating: avgRating.toFixed(1),
                reviewCount: reviews.length
            }
        });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({
            success: false,
            error: 'Error al obtener el producto'
        });
    }
};

// POST /api/products - Crear un nuevo producto (Admin)
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, images, variants } = req.body;

        // Validación básica
        if (!name || !price) {
            return res.status(400).json({
                success: false,
                error: 'Nombre y precio son requeridos'
            });
        }

        const product = await Product.create({
            name,
            description,
            price,
            category
        });

        // Crear imágenes si se proporcionan
        if (images && images.length > 0) {
            await Promise.all(
                images.map(img =>
                    ProductImage.create({
                        product_id: product.id,
                        image_url: img.url,
                        color: img.color,
                        is_primary: img.isPrimary || false
                    })
                )
            );
        }

        // Crear variantes si se proporcionan
        if (variants && variants.length > 0) {
            await Promise.all(
                variants.map(async variant => {
                    const productVariant = await ProductVariant.create({
                        product_id: product.id,
                        sku: variant.sku,
                        price: variant.price || price,
                        stock_quantity: variant.stock || 0
                    });

                    // Crear atributos de variante
                    if (variant.attributes) {
                        await Promise.all(
                            variant.attributes.map(attr =>
                                VariantAttribute.create({
                                    product_variant_id: productVariant.id,
                                    attribute_name: attr.name,
                                    attribute_value: attr.value
                                })
                            )
                        );
                    }
                })
            );
        }

        // Obtener el producto completo
        const fullProduct = await Product.findByPk(product.id, {
            include: [ProductImage, ProductVariant]
        });

        res.status(201).json({
            success: true,
            data: fullProduct
        });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({
            success: false,
            error: 'Error al crear el producto'
        });
    }
};

// PUT /api/products/:id - Actualizar un producto (Admin)
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, category } = req.body;

        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'Producto no encontrado'
            });
        }

        await product.update({
            name,
            description,
            price,
            category
        });

        res.json({
            success: true,
            data: product
        });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({
            success: false,
            error: 'Error al actualizar el producto'
        });
    }
};

// DELETE /api/products/:id - Eliminar un producto (Admin)
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'Producto no encontrado'
            });
        }

        await product.destroy();

        res.json({
            success: true,
            message: 'Producto eliminado correctamente'
        });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({
            success: false,
            error: 'Error al eliminar el producto'
        });
    }
};

// GET /api/products/categories - Obtener categorías únicas
export const getCategories = async (req, res) => {
    try {
        const categories = await Product.findAll({
            attributes: [
                [sequelize.fn('DISTINCT', sequelize.col('category')), 'category']
            ],
            where: {
                category: {
                    $ne: null
                }
            }
        });

        res.json({
            success: true,
            data: categories.map(c => c.category)
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({
            success: false,
            error: 'Error al obtener categorías'
        });
    }
};
