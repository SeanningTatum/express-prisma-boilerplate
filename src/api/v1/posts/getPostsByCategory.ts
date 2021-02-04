// MARK:- Imports
import { Post, PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

import { GenericReturn } from '~/types/GenericReturn';

const prisma = new PrismaClient();

// MARK:- Types
interface QueryParams {
  categoryName: string;
}

interface RequestBody {

}

interface ReturnValue extends GenericReturn<Post[]> {}

// MARK:- Function
async function getPostsByCategory(
  req: Request<QueryParams, {}, RequestBody>, res: Response<ReturnValue>,
) {
  const { categoryName } = req.params;

  try {
    const result = await prisma.post.findMany({
      where: {
        categories: { every: { name: categoryName } },
      },
    });

    return res.json({
      code: 200,
      message: 'Successfully fetched posts by user',
      body: result,
    });
  } catch (err) {
    return res.json({
      code: err.code || 500,
      message: err.message,
    });
  }
}

export default getPostsByCategory;
