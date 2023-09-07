import { PrismaClient } from '@prisma/client';
import { Request, Response, Router, } from 'express';
import { format } from 'date-fns';

//const router = express.Router();
const prisma = new PrismaClient();

export const routerPost = Router();

declare module 'express-session' {
  export interface SessionData {
    userId: { [key: string]: any };
  }
}

routerPost.post('/newpost', async (req: Request , res: Response) => {
    const { title, content } = req.body;

    if (!req.session || !req.session.userId) {
        return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    try {
      const post = await prisma.post.create({
        data: {
          title,
          content,
          authorId: req.session.userId,
          createdAt: new Date(),
        },
      });
  
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el post' });
    }
  });

  routerPost.get('/allposts', async (req: Request, res: Response) => {
    try {
      const posts = await prisma.post.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          author: {
            select: {
              firstName: true, 
              lastName: true,  
            },
          },
        },
      });

      
      const formattedPosts = posts.map((post: any) => ({
        author: `${post.author.firstName} ${post.author.lastName}`,
        createdAt: format(post.createdAt, 'dd/MM/yyyy HH:mm'),
        title: post.title,
        contentPreview: post.content.slice(0, 3),
      }));
    
      res.json(formattedPosts);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los posts' });
    }
  });