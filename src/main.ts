import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { TcpOptions, Transport, RmqOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const tcpHort = configService.get<string>('tcpHost');
  const tcpPort = configService.get<number>('tcpPost');
  const post = configService.get<number>('post');
  const rmqUrl = configService.get<string>('rmqUrl');
  const queue: string = configService.get<string>('QUEUE');

  app.connectMicroservice<RmqOptions>({
    transport: Transport.RMQ,
    options: {
      queue,
      noAck: true,
      urls: [rmqUrl],
      queueOptions: {
        durable: false,
      },
    },
  });

  app.connectMicroservice<TcpOptions>({
    transport: Transport.TCP,
    options: {
      host: tcpHort,
      port: tcpPort,
    },
  });

  app.startAllMicroservices();
  await app.listen(post);
}
bootstrap();
