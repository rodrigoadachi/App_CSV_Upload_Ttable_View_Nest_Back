export interface Pagination<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
  pages: number;
}

export interface PrismaModel<T> {
  findMany(options: { skip: number; take: number }): Promise<T[]>;
  count(): Promise<number>;
}
