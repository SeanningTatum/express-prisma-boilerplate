// MARK:- Imports
import { Category, Post, PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

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

// MARK:- Function
async function getPostsByUser(
  req: Request<QueryParams, {}, RequestBody>, res: Response<ReturnValue>,
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
    return res.json({
      code: err.code || 500,
      message: err.message,
    });
  }
}

export default getPostsByUser;
