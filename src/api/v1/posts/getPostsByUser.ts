// MARK:- Imports

import { Category, Post, PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

import { Joi, ValidationError } from 'express-validation';
import { GenericReturn } from '~/types/GenericReturn';

const prisma = new PrismaClient();

// MARK:- Types
interface QueryParams {
  userId: number;
}

interface RequestBody {

}

interface ReturnValue extends GenericReturn<(Post & {
  categories: Category[];
})[]> {}

// MARK:- Validation
export const getPostsByUserValidation = {
  params: Joi.object({
    userId: Joi.number().required(),
  }),
};

// MARK:- Function
async function getPostsByUser(
  req: Request<QueryParams, any, RequestBody, any>, res: Response<ReturnValue | ValidationError>,
) {
  const { userId } = req.params;

  try {
    const result = await prisma.user.findUnique({
      where: { id: +userId },
    }).posts({
      include: {
        categories: true,
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

    return res.status(500).json({
      code: err.code || 500,
      message: err.message,
    });
  }
}

export default getPostsByUser;
