import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('example') // Optional: Group routes under tags
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // Swagger UI endpoint: /api-docs
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server is running at: http://localhost:3000/swagger`);
}
bootstrap();
