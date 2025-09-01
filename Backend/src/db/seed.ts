import { Pool } from 'pg';
import { dbConfig } from '../config';

const pool = new Pool(dbConfig);

const seed = async () => {
  try {
    // Create categories
    await pool.query(`
      INSERT INTO categories (name, description) VALUES
      ('Flowers', 'Beautiful bouquets for any occasion'),
      ('Chocolates', 'Delicious handcrafted chocolates'),
      ('Gift Baskets', 'Curated gift baskets for everyone');
    `);

    // Create products
    await pool.query(`
      INSERT INTO products (name, description, price, category_id) VALUES
      ('Rose Bouquet', 'A dozen red roses', 45.00, 1),
      ('Box of Truffles', 'Assorted chocolate truffles', 25.00, 2),
      ('Spa Day Basket', 'A relaxing collection of spa items', 75.00, 3);
    `);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    pool.end();
  }
};

seed();
