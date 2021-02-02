import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

async function createUser(req: Request, res: Response) {
  try {
    const result = await prisma.user.create({
      data: {
        ...req.body,
      },
    });

    return res.json(result);
  } catch (err) {
    return res.json({
      code: err.code || 500,
      message: err.message,
    });
  }
}

export default createUser;
