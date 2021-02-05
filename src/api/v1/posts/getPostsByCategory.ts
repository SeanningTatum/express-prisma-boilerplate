// MARK:- Imports
import { Post, PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { Joi, ValidationError } from 'express-validation';

import { GenericReturn } from '~/types/GenericReturn';

const prisma = new PrismaClient();

// MARK:- Types
interface QueryParams {
  categoryName: string;
}

interface RequestBody {

}

interface ReturnValue extends GenericReturn<Post[]> {}

// MARK:- Validation
export const getPostsByCategoryValidation = {
  query: Joi.object({
    categoryName: Joi.string().required(),
  }),
};

// MARK:- Function
async function getPostsByCategory(
  req: Request<QueryParams, {}, RequestBody>, res: Response<ReturnValue>,
) {
  const { categoryName = '' } = req.query;

  try {
    const result = await prisma.post.findMany({
      where: {
        categories: { every: { name: String(categoryName) } },
      },
    });

    return res.json({
      code: 200,
      message: 'Successfully fetched posts by user',
      body: result,
    });
  } catch (err) {
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json({
        code: err.statusCode,
        message: err.message,
      });
    }

    return res.json({
      code: err.code || 500,
      message: err.message,
    });
  }
}

export default getPostsByCategory;
