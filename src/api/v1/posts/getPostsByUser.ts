// MARK:- Imports
import { Post, PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

import { GenericReturn } from '~/types/GenericReturn';

const prisma = new PrismaClient();

// MARK:- Types
interface QueryParams {}

interface RequestBody {
    userId: number;
}

interface ReturnValue extends GenericReturn<Post[]> {}

// MARK:- Function
async function getPostsByUser(
  req: Request<QueryParams, {}, RequestBody>, res: Response<ReturnValue>,
) {
  const { userId } = req.body;

  try {
    const result = await prisma.user.findUnique({
      where: { id: userId },
    }).posts();

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
