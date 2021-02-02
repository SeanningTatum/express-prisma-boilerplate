import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

async function getUsers(req: Request, res: Response) {
  try {
    const result = await prisma.user.findMany();

    return res.json({
      data: result,
      status: 200,
      message: 'Users retrieved successfully',
    });
  } catch (err) {
    return res.json({
      code: err.code || 500,
      message: err.message || 'An error has occurred',
    });
  }
}

export default getUsers;
