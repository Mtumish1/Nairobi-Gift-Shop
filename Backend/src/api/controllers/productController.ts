import { Request, Response } from 'express';

export const getAllProducts = async (req: Request, res: Response) => {
  // TODO: Fetch all products from the database
  res.json([]);
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  // TODO: Fetch product by id from the database
  res.json({ id, name: `Product ${id}` });
};
