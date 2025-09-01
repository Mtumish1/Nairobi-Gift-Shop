import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, Nairobi Gift Shop Backend!');
});

import userRoutes from './api/routes/users';
app.use('/api/users', userRoutes);

import productRoutes from './api/routes/products';
app.use('/api/products', productRoutes);

import categoryRoutes from './api/routes/categories';
app.use('/api/categories', categoryRoutes);

import orderRoutes from './api/routes/orders';
app.use('/api/orders', orderRoutes);

import webhookRoutes from './api/routes/webhooks';
app.use('/api/webhooks', webhookRoutes);






export default app;
