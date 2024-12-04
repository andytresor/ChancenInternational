import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
<<<<<<< HEAD

  // Configuration CORS 
  app.enableCors({ origin: ['http://localhost:3000', 'http://localhost:3001' , 'http://localhost:5173'] ,// Autorise uniquement cette origine 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Méthodes HTTP autorisées 
    credentials: true, // Autorise les cookies 
    allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization', // En-têtes autorisés

  }); 

  app.useGlobalPipes(new ValidationPipe());
=======
  
  app.enableCors({
    origin: 'http://localhost:5173', // Allow requests from your React app
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow credentials if needed
  });

>>>>>>> origin/main
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
