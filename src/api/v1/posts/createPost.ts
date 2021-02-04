// MARK:- Imports
import { Post, PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

import { GenericReturn } from '~/types/GenericReturn';

const prisma = new PrismaClient();

// MARK:- Types
interface QueryParams {
  userId: string;
}

interface RequestBody {
  title: string;
  content: string;

  categoryName: string;
}

interface ReturnValue extends GenericReturn<Post> {}

// MARK:- Function
async function createPost(req: Request<QueryParams, {}, RequestBody>, res: Response<ReturnValue>) {
  const {
    title, content, categoryName,
  } = req.body;

  const { userId } = req.params;

  try {
    const result = await prisma.post.create({
      data: {
        title,
        content,
        published: false,
        author: { connect: { id: +userId } },
        categories: { connect: { name: categoryName } },
      },
    });

    return res.json({
      code: 200,
      message: 'Created Post successfully',
      body: result,
    });
  } catch (err) {
    return res.json({
      code: err.code || 500,
      message: err.message,
    });
  }
}

export default createPost;
