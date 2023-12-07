import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      envFilePath: ['.env'],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'TEST_TCP',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('tcpHost'),
            port: configService.get<number>('tcpPost'),
          },
        });
      },
      inject: [ConfigService],
    },
    {
      provide: 'TEST_RMQ',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            noAck: true,
            queueOptions: {
              durable: false,
            },
            queue: configService.get<string>('QUEUE'),
            urls: [configService.get<string>('rmqUrl')],
          },
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
