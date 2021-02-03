// MARK:- Imports
import { PrismaClient, User } from '@prisma/client';
import { Request, Response } from 'express';

import { GenericReturn } from '~/types/GenericReturn';

const prisma = new PrismaClient();

// MARK:- Types
interface QueryParams {}

interface ReturnValue extends GenericReturn<User> {}

// MARK:- Function
async function createUser(req: Request<QueryParams, {}, User>, res: Response<ReturnValue>) {
  try {
    const result = await prisma.user.create({
      data: {
        ...req.body,
      },
    });

    return res.json({
      code: 200,
      message: 'Created user successfully',
      body: result,
    });
  } catch (err) {
    return res.json({
      code: err.code || 500,
      message: err.message,
    });
  }
}

export default createUser;
