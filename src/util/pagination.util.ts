import { Pagination, PrismaModel } from 'src/types/Pagination';

export const pagination = async <T>(
  prisma: PrismaModel<T>,
  page: number,
  perPage: number,
): Promise<Pagination<T>> => {
  const options = {
    skip: (page - 1) * perPage,
    take: Number(perPage),
  };
  const data = await prisma.findMany(options);
  const total = await prisma.count();
  const pages = Math.ceil(total / perPage);
  return {
    data,
    total: Number(total),
    page: Number(page),
    perPage: Number(perPage),
    pages: Number(pages),
  };
};
