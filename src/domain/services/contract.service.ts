import { Injectable, Logger } from '@nestjs/common';
import { createReadStream } from 'fs';
import * as csv from 'csv-parser';
import { PrismaService } from './prisma.service';
import { CreateContractDTO } from '../dto/contract/create-contract.dto';
import { ContractDTO } from '../dto/contract/contract.dto';
import { normalizeDate } from 'src/util/date.util';
import { pagination } from 'src/util/pagination.util';
import { Pagination } from 'src/types/Pagination';
import { create } from 'domain';
import { normalize } from 'path';
import { async } from 'rxjs';
import { ok } from 'assert';

@Injectable()
export class ContractService {
  private readonly logger = new Logger(ContractService.name);

  constructor(private prismaService: PrismaService) {}

  async getAll(
    page: number,
    perPage: number,
  ): Promise<Pagination<ContractDTO>> {
    const result = await pagination<ContractDTO>(
      this.prismaService.contract,
      page,
      perPage,
    );
    result.data = await Promise.all(
      result.data.map(async (item) => ({
        ...item,
        validate: await this.validate(item),
      })),
    );
    return result;
  }

  private async validate(data: ContractDTO) {
    const valuePerInstallment = Math.floor(data?.vlTotal / data?.qtPrestacoes);

    if (valuePerInstallment !== data?.vlPresta)
      return 'O pagamento está inconsistente.';

    // const paymentDate = new Date(data?.dataPagamento)
    // const dueDate = new Date(data?.dtVctPre)
    // if (paymentDate > dueDate)
    //   return 'Existe um juros acumulado devido ao atraso no pagamento.'

    // if (data?.vlMovimento > data?.vlPag)
    //   return 'O valor do movimento é maior que o valor do pagamento. Valor de mora aplicado.'

    return 'Correto';
  }

  private async create(data: ContractDTO[]) {
    const result = await this.prismaService.contract.createMany({ data });
    return result?.count;
  }

  private async normalize(data: CreateContractDTO[]): Promise<ContractDTO[]> {
    data.shift();
    return data.map((row) => ({
      ...row,
      dtContrato: normalizeDate(row?.dtContrato),
      dtVctPre: normalizeDate(row?.dtVctPre),
      qtPrestacoes: Number(row?.qtPrestacoes),
      vlTotal: Number(row?.vlTotal),
      vlPresta: Number(row?.vlPresta),
      vlMora: Number(row?.vlMora),
      vlMulta: Number(row?.vlMulta),
      vlOutAcr: Number(row?.vlOutAcr),
      vlIof: Number(row?.vlIof),
      vlDescon: Number(row?.vlDescon),
      vlAtual: Number(row?.vlAtual),
    }));
  }

  async uploadCsv(file, header: Array<string>) {
    this.logger.debug(`Contract Service:: upload file ${file?.originalname}`);
    const results = [];
    return new Promise((resolve, reject) => {
      createReadStream(file.path)
        .pipe(csv(header))
        .on('data', (data) => results.push(data))
        .on('end', async () => {
          try {
            const validated = await this.normalize(results);
            const count = await this.create(validated);
            resolve({ success: true, error: false, count });
          } catch (error) {
            this.logger.error(
              `ERRO Contract Service:: upload file ${error.message}`,
            );
            reject({ success: false, error: true, message: error.message });
          }
        });
    });
  }
}
