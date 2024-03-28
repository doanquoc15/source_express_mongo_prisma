// import prisma from '../utils/prisma.js';
import responseHandler from '../handlers/response.handler';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import jsonwebtoken from 'jsonwebtoken';

const prisma = new PrismaClient();

const DEFAULT_PAGE = 1;
const DEFAULT_SIZE = 10;


const signUp = async (req:any, res:any) => {
    try {
      const { name, email, password } = req.body;
  
      // check registered phone number or not
      const checkUser :any = await prisma.user.findFirst({
        where: {
          email,
        },
      });
  
      if (checkUser)
        return responseHandler.badRequest(res, 'Email already exists!!');
  
      // Hash the password using SHA-256 and a random salt
      const salt = crypto.randomBytes(16).toString('hex');
      const hashedPassword = crypto
        .createHash('sha256')
        .update(password + salt)
        .digest('hex');
  
      // Create a new user in the database
    const user = await prisma.user.create({
        data: {
            ...checkUser,
            role_id: checkUser?.role_id ?? "66053734107b260f2b69abe6",
            name: name,
            email,
            password: hashedPassword,
            salt: salt,
        },
    });
  
      // Generate a JWT for the new user
      const token = jsonwebtoken.sign(
        { userId: user.id, roleId: user.role_id },
        process.env.JWT_SECRET ?? 'default secret',
        {
          expiresIn: '24h',
        }
      );
  
      responseHandler.created(res, { user, token });
    } catch (error) {
      console.log(error);
      responseHandler.error(res);
    }
  };
  

const signIn = async (req:any, res:any) => {
  try {
    const { email, password } = req.body;

    // Find the user in the database
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    // If the user does not exist, return an error
    if (!user)
        return responseHandler.unauthorize(
            res,
            'Incorrect account or password!!!'
        );

    // Hash the password using the user's salt
    const hashedPassword = crypto
      .createHash('sha256')
      .update(password + user.salt)
      .digest('hex');

    // If the password is incorrect, return an error
    if (hashedPassword !== user.password)
        return responseHandler.unauthorize(
            res,
            'Incorrect account or password!!!'
        );

    // Generate a JWT for the user
    const token = jsonwebtoken.sign(
        { userId: user.id, roleName: user.role_id },
        process.env.JWT_SECRET ?? 'default-secret'
    );

    responseHandler.ok(res, { token, user });
  } catch (error) {
    console.log(error);
    responseHandler.error(res);
  }
};

export default {
  signIn,
  signUp,   
};