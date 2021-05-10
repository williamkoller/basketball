import { Message } from '@/utils/@types/message/message.type';
import { Injectable } from '@nestjs/common';
import { LoadById } from '@/modules/users/dtos/load-by-id/load-by-id.dto';
import { DeleteUserRepository } from '@/modules/users/repositories/delete-user/delete-user.repository';
import { LoadUserByIdService } from '../load-user-by-id/load-user-by-id.service';

@Injectable()
export class DeleteUserService {
  constructor(
    private readonly deleteUserRepository: DeleteUserRepository,
    private readonly loadUserByIdService: LoadUserByIdService,
  ) {}

  async deleteUser({ id }: LoadById): Promise<Message> {
    await this.loadUserByIdService.loadById({ id });
    return await this.deleteUserRepository.deleteUser({ id });
  }
}
