import User from './User.js';
import Product from './Product.js';
import ProductVariant from './ProductVariant.js';
import VariantAttribute from './VariantAttribute.js';
import ProductImage from './ProductImage.js';
import Review from './Review.js';
import Cart from './Cart.js';
import CartItem from './CartItem.js';
import Order from './Order.js';
import OrderItem from './OrderItem.js';
import Wishlist from './Wishlist.js';

// 1. Usuario y Reviews
User.hasMany(Review, { foreignKey: 'user_id' });
Review.belongsTo(User, { foreignKey: 'user_id' });

// 2. Producto y Reviews
Product.hasMany(Review, { foreignKey: 'product_id' });
Review.belongsTo(Product, { foreignKey: 'product_id' });

// 3. Producto y Variantes
Product.hasMany(ProductVariant, { foreignKey: 'product_id' });
ProductVariant.belongsTo(Product, { foreignKey: 'product_id' });

// 4. Variantes y Atributos
ProductVariant.hasMany(VariantAttribute, { foreignKey: 'product_variant_id' });
VariantAttribute.belongsTo(ProductVariant, { foreignKey: 'product_variant_id' });

// 5. Producto e Imágenes
Product.hasMany(ProductImage, { foreignKey: 'product_id' });
ProductImage.belongsTo(Product, { foreignKey: 'product_id' });

// 6. Carrito y Items (A través de Variantes)
Cart.hasMany(CartItem, { foreignKey: 'cart_id' });
CartItem.belongsTo(Cart, { foreignKey: 'cart_id' });
ProductVariant.hasMany(CartItem, { foreignKey: 'product_variant_id' });
CartItem.belongsTo(ProductVariant, { foreignKey: 'product_variant_id' });

// 7. Relación Usuario -> Carrito
User.hasOne(Cart, { foreignKey: 'user_id' });
Cart.belongsTo(User, { foreignKey: 'user_id' });

// 8. Orden y OrderItems
Order.hasMany(OrderItem, { foreignKey: 'order_id' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });
ProductVariant.hasMany(OrderItem, { foreignKey: 'product_variant_id' });
OrderItem.belongsTo(ProductVariant, { foreignKey: 'product_variant_id' });

// 9. Wishlist
User.belongsToMany(Product, { through: Wishlist, foreignKey: 'user_id' });
Product.belongsToMany(User, { through: Wishlist, foreignKey: 'product_id' });

export {
    User,
    Product,
    ProductVariant,
    VariantAttribute,
    ProductImage,
    Review,
    Cart,
    CartItem,
    Order,
    OrderItem,
    Wishlist
};