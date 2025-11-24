-- 1. Usuarios
create table users (
  id bigint primary key generated always as identity,
  name text not null,
  email text unique not null,
  password text not null,
  created_at timestamptz default now()
);

-- 2. Productos (Padre / Catálogo General)
create table products (
  id bigint primary key generated always as identity,
  name text not null,
  description text,
  price numeric(10, 2) not null, -- Precio base o de muestra
  created_at timestamptz default now(),
  category text
);

-- 3. Variantes de Productos (Lo que realmente se compra)
create table product_variants (
  id bigint primary key generated always as identity,
  product_id bigint references products (id) on delete cascade,
  sku text unique, -- Código único de inventario (ej: NIKE-ROJ-M)
  price numeric(10, 2) not null, -- Precio específico de esta variante
  stock int not null default 0,   -- Stock específico de esta variante
  created_at timestamptz default now()
);

-- 4. Atributos de la Variante (Ej: Talle: M, Material: Algodón)
create table variant_attributes (
  id bigint primary key generated always as identity,
  product_variant_id bigint references product_variants (id) on delete cascade,
  attribute_name text not null, -- Ej: "Talle", "Color"
  attribute_value text not null, -- Ej: "M", "Rojo"
  created_at timestamptz default now()
);

-- 5. Imágenes (Filtrables por color)
create table product_images (
  id bigint primary key generated always as identity,
  product_id bigint references products (id) on delete cascade,
  image_url text not null,
  color text, -- Ej: 'Rojo'. Si es NULL, es la imagen por defecto/general del producto
  created_at timestamptz default now()
);

-- 6. Reseñas (Se hacen al producto general, no a la variante específica)
create table reviews (
  id bigint primary key generated always as identity,
  user_id bigint references users (id),
  product_id bigint references products (id),
  rating int check (rating >= 1 and rating <= 5),
  comment text,
  created_at timestamptz default now()
);

-- 7. Carrito (Cabecera)
create table carts (
  id bigint primary key generated always as identity,
  user_id bigint references users (id),
  created_at timestamptz default now()
);

-- 8. Items del Carrito
create table cart_items (
  id bigint primary key generated always as identity,
  cart_id bigint references carts (id) on delete cascade,
  product_variant_id bigint references product_variants (id),
  quantity int not null check (quantity > 0)
);

-- 9. Órdenes (Cabecera)
create table orders (
  id bigint primary key generated always as identity,
  user_id bigint references users (id),
  total numeric(10, 2) not null,
  created_at timestamptz default now()
);

-- 10. Items de la Orden
create table order_items (
  id bigint primary key generated always as identity,
  order_id bigint references orders (id) on delete cascade,
  product_variant_id bigint references product_variants (id),
  quantity int not null check (quantity > 0),
  price numeric(10, 2) not null -- Guardamos el precio al momento de la compra (por si despues se cambia el precio)
);

-- 11. Lista de Deseos (Suele ser al producto general)
create table wishlist (
  id bigint primary key generated always as identity,
  user_id bigint references users (id),
  product_id bigint references products (id),
  created_at timestamptz default now()
);