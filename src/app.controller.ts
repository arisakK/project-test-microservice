import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getTest(): Promise<any> {
    let tcp: string, rmq: string;
    try {
      tcp = await this.appService.getTcp();
      rmq = await this.appService.getRmq();
    } catch (e) {
      console.log(e);
    }
    return `
      tcp microservice : ${tcp} //////////
      rmq microservice : ${rmq}
      `;
  }

  @MessagePattern('tcp')
  tcp() {
    return 'Hello World Tcp';
  }

  @MessagePattern('rmq')
  rmq() {
    return 'Hello World Rmq';
  }
}
