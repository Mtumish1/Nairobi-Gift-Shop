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



export default app;
