import { IsString, IsNumber, IsDate, IsUUID } from 'class-validator';

export class ContractDTO {
  @IsUUID()
  id?: string;

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

  @IsDate()
  dtContrato: Date;

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

  @IsDate()
  dtVctPre: Date;

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

  @IsString()
  validate?: string;
}
