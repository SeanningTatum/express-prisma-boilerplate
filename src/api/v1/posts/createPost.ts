// MARK:- Imports
import { Post, PrismaClient, User } from '@prisma/client';
import { Request, Response } from 'express';

import { GenericReturn } from '../../../types/GenericReturn';

const prisma = new PrismaClient();

// MARK:- Types
interface QueryParams {}

interface RequestBody {
    title: string;
    content: string;
    userId: number;
}

interface ReturnValue extends GenericReturn<Post> {}


// MARK:- Function
async function createPost(req: Request<QueryParams, {}, RequestBody>, res: Response<ReturnValue>) {

    const {title, content, userId} = req.body

  try {
    const result = await prisma.post.create({
        data: {
            title,
            content,
            published: false,
            author: { connect: { id: userId } }
        }
    })

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
