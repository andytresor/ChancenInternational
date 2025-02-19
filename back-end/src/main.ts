import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Allowed origins
  const allowedOrigins = [
    'http://localhost:5173',
    'https://a543-2a0d-3344-129e-410-cd7f-8af6-c93f-4529.ngrok-free.app'
  ];
  
  const normalizeOrigin = (origin: string) => origin.replace(/\/$/, '');

  app.enableCors({
    origin: (origin, callback) => {
      console.log('Incoming request origin:', origin);
      if (!origin || allowedOrigins.map(normalizeOrigin).includes(normalizeOrigin(origin))) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });  

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
