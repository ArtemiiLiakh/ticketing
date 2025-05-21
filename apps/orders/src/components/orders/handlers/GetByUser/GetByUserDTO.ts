import { PaginationByPageDTO } from '@app2/common/types';

export interface GetByUserDTO extends PaginationByPageDTO {
  userId: string;
}