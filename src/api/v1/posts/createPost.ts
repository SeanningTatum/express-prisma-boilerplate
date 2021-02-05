// MARK:- Imports
import { Post, PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { Joi } from 'express-validation';

import { GenericReturn } from '~/types/GenericReturn';

const prisma = new PrismaClient();

// MARK:- Types
interface QueryParams {
  userId: string;
}

interface RequestBody {
  title: string;
  content?: string;

  categoryName: string;
}

interface ReturnValue extends GenericReturn<Post> {}

// MARK:- Validation
export const createPostValidation = {
  params: Joi.object({
    userId: Joi.number().required(),
  }),
  body: Joi.object({
    title: Joi.string().required(),
    content: Joi.string(),
    categoryName: Joi.string().required(),
  }),
};

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
        categories: {
          connectOrCreate: {
            where: { name: categoryName },
            create: {
              name: categoryName,
            },
          },
        },
      },
    });

    return res.json({
      code: 200,
      message: 'Created Post successfully',
      body: result,
    });
  } catch (err) {
    if (err.code === 'P2016') {
      return res.json({
        code: 404,
        message: 'User ID does not exist!',
      });
    }

    return res.json({
      code: err.code || 500,
      message: err.message,
    });
  }
}

export default createPost;
