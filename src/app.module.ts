import { PrismaService } from './domain/services/prisma.service';
import { ContractService } from './domain/services/contract.service';
import { ContractController } from './adapters/controllers/contract.controller';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { ContractAppService } from './application/services/contract.application.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MulterModule.register({ dest: './uploads' }),
  ],
  controllers: [ContractController],
  providers: [PrismaService, ContractAppService, ContractService],
})
export class AppModule {
  static port: number;

  constructor(private readonly configService: ConfigService) {
    AppModule.port = configService.get('APP_PORT');
  }
}
