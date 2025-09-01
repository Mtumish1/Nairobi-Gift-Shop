import { Request, Response } from 'express';

export const getAllCategories = async (req: Request, res: Response) => {
  // TODO: Fetch all categories from the database
  res.json([]);
};

export const getProductsByCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  // TODO: Fetch products by category id from the database
  res.json({ categoryId: id, products: [] });
};
