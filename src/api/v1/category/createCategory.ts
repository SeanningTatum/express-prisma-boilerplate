// MARK:- Imports
import { Category, PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

import { GenericReturn } from '~/types/GenericReturn';

const prisma = new PrismaClient();

// MARK:- Types
interface QueryParams {}

interface RequestBody {
  name: string;
}

interface ReturnValue extends GenericReturn<Category> {}

// MARK:- Function
async function createCategory(
  req: Request<QueryParams, {}, RequestBody>, res: Response<ReturnValue>,
) {
  const { name } = req.body;

  try {
    const result = await prisma.category.create({
      data: {
        name,
      },
    });

    return res.json({
      code: 200,
      message: 'Created Category successfully',
      body: result,
    });
  } catch (err) {
    return res.json({
      code: err.code || 500,
      message: err.message,
    });
  }
}

export default createCategory;
