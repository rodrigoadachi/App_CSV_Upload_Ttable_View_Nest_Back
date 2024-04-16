import {
  Controller,
  Get,
  Logger,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ContractAppService } from 'src/application/services/contract.application.service';

@Controller('contract')
export class ContractController {
  private logger = new Logger(ContractController.name);
  constructor(private readonly appService: ContractAppService) {}

  @Get()
  async getAll(
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 10,
  ) {
    return await this.appService.getAll(page, perPage);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCsv(@UploadedFile() file) {
    console.log({ file });
    if (!file) {
      this.logger.error('No file uploaded');
      return new Error('No file uploaded');
    }
    const result = await this.appService.uploadCsv(file, [
      'nrInst',
      'nrAgencia',
      'cdClient',
      'nmClient',
      'nrCpfCnpj',
      'nrContrato',
      'dtContrato',
      'qtPrestacoes',
      'vlTotal',
      'cdProduto',
      'dsProduto',
      'cdCarteira',
      'dsCarteira',
      'nrProposta',
      'nrPresta',
      'tpPresta',
      'nrSeqPre',
      'dtVctPre',
      'vlPresta',
      'vlMora',
      'vlMulta',
      'vlOutAcr',
      'vlIof',
      'vlDescon',
      'vlAtual',
      'idSituac',
      'idSitVen',
    ]);
    return result;
  }
}
