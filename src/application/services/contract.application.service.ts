import { Injectable, Logger } from '@nestjs/common';
import { ContractService } from 'src/domain/services/contract.service';

@Injectable()
export class ContractAppService {
  private readonly logger = new Logger(ContractAppService.name);

  constructor(private service: ContractService) {}

  async getAll(page: number, perPage: number) {
    return await this.service.getAll(page, perPage);
  }

  async uploadCsv(file, header: Array<string>) {
    return await this.service.uploadCsv(file, header);
  }
}
