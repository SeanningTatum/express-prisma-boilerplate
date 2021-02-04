// MARK:- Imports
import { PrismaClient, Category } from '@prisma/client';
import { Request, Response } from 'express';

import { GenericReturn } from '~/types/GenericReturn';

const prisma = new PrismaClient();

// MARK:- Types
interface QueryParams {
    categoryId: number;
}

interface RequestBody {

}

interface ReturnValue extends GenericReturn<Category[]> {}

// MARK:- Function
async function getCategories(
  req: Request<QueryParams, {}, RequestBody>, res: Response<ReturnValue>,
) {
  try {
    const result = await prisma.category.findMany();

    return res.json({
      code: 200,
      message: 'Successfully fetched categories',
      body: result,
    });
  } catch (err) {
    return res.json({
      code: err.code || 500,
      message: err.message,
    });
  }
}

export default getCategories;
