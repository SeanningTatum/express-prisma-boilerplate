import { PrismaClient, User } from '@prisma/client';
import { Request, Response } from 'express';

import { GenericReturn } from '~/types/GenericReturn';

const prisma = new PrismaClient();

type ReturnValue = GenericReturn<User[]>

async function getUsers(req: Request, res: Response<ReturnValue>) {
  try {
    const result = await prisma.user.findMany();

    return res.json({
      code: 200,
      message: 'Users retrieved successfully',
      body: result,
    });
  } catch (err) {
    return res.json({
      code: err.code || 500,
      message: err.message || 'An error has occurred',
    });
  }
}

export default getUsers;
