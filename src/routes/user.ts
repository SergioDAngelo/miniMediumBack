import { PrismaClient } from '@prisma/client';
import express, { Request, Response, Router } from 'express';
import bcrypt from 'bcrypt' ;
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const prisma = new PrismaClient();


const activeSessions = new Map<string, boolean>();
app.use(bodyParser.json());
app.use(cors());

export const routerUser = Router();

routerUser.post('/signup', async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          password: hashedPassword,
        },
      });
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Error al registrar usuario' });
    }
  });

routerUser.post('/signin', async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    try {
      const user = await prisma.user.findUnique({ where: { email } });
  
      if (!user) {
        return res.status(401).json({ error: 'Usuario no encontrado' });
      }
  
      const passwordMatches = await bcrypt.compare(password, user.password);

      if (!passwordMatches) {
        return res.status(401).json({ error: 'Contraseña incorrecta' });
      }
        
      activeSessions.set(user.id.toString(), true);
      res.json({ message: 'Inicio de sesión exitoso' });
    
    } catch (error) {
      res.status(500).json({ error: 'Error en el servidor' });
    }
  });
