import { IsString, IsNumber, IsDate, IsUUID } from 'class-validator';

export class CreateContractDTO {
  @IsString()
  nrInst: string;

  @IsString()
  nrAgencia: string;

  @IsString()
  cdClient: string;

  @IsString()
  nmClient: string;

  @IsString()
  nrCpfCnpj: string;

  @IsString()
  nrContrato: string;

  @IsString()
  dtContrato: string;

  @IsNumber()
  qtPrestacoes: number;

  @IsNumber()
  vlTotal: number;

  @IsString()
  cdProduto: string;

  @IsString()
  dsProduto: string;

  @IsString()
  cdCarteira: string;

  @IsString()
  dsCarteira: string;

  @IsString()
  nrProposta: string;

  @IsString()
  nrPresta: string;

  @IsString()
  tpPresta: string;

  @IsString()
  nrSeqPre: string;

  @IsString()
  dtVctPre: string;

  @IsNumber()
  vlPresta: number;

  @IsNumber()
  vlMora: number;

  @IsNumber()
  vlMulta: number;

  @IsNumber()
  vlOutAcr: number;

  @IsNumber()
  vlIof: number;

  @IsNumber()
  vlDescon: number;

  @IsNumber()
  vlAtual: number;

  @IsString()
  idSituac: string;

  @IsString()
  idSitVen: string;

  @IsDate()
  created_at: Date;
}
