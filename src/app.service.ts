import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  @Inject('TEST_TCP') private readonly tcpClient: ClientProxy;
  @Inject('TEST_RMQ') private readonly rmqClient: ClientProxy;

  async getTcp(): Promise<string> {
    return firstValueFrom(this.tcpClient.send('tcp', {}));
  }

  async getRmq(): Promise<string> {
    return lastValueFrom(this.rmqClient.send('rmq', {}));
  }
}
