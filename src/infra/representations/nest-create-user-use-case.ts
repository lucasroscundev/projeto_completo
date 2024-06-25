import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator'
import { UsersRepository } from '@/domain/forum/application/repositories/users-repository'
import { CreateUserUseCase } from '@/domain/forum/application/use-cases/create-user'

import { Injectable } from '@nestjs/common'

@Injectable()
export class NestCreateUserUseCase extends CreateUserUseCase {
  constructor(
    usersRepository: UsersRepository,
    hashGenerator: HashGenerator,
  ) {
    super(usersRepository, hashGenerator)
  }
}
