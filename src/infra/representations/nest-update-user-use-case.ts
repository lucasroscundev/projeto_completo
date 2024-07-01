import { UsersRepository } from '@/domain/forum/application/repositories/users-repository'
import { UpdateUserUseCase } from '@/domain/forum/application/use-cases/update-user'

import { Injectable } from '@nestjs/common'

@Injectable()
export class NestUpdateUserUseCase extends UpdateUserUseCase {
  constructor(
    usersRepository: UsersRepository,    
  ) {
    super(usersRepository)
  }
}
