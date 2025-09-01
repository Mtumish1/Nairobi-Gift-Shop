CREATE TYPE order_status AS ENUM ('pending', 'paid', 'shipped', 'delivered');

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    status order_status DEFAULT 'pending',
    total_amount DECIMAL NOT NULL,
    delivery_address TEXT,
    tracking_number VARCHAR(255) UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
