import { User } from '@/infra/db/entities/user.entity';

export type UserTokenInputType = {
  user: User;
  token: string;
};
