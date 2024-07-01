import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User } from '../../enterprise/entities/user'
import { UsersRepository } from '../repositories/users-repository'

interface UpdateUserUseCaseRequest {
    email: string
    name: string  
    nickname: string
    picture: string
    emailVerified: boolean
    givenName: string
    familyName: string
    isAuthUser: boolean    
}

type UpdateUserUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    user: User
  }
>

export class UpdateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    email,
    name,
    nickname,
    picture,
    emailVerified,
    givenName,
    familyName,
    isAuthUser,    
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    user.email = email
    user.name = name
    user.nickname = nickname
    user.picture = picture
    user.emailVerified = emailVerified
    user.givenName = givenName
    user.familyName = familyName
    user.isAuthUser = isAuthUser    
    
    await this.usersRepository.update(user)

    return right({
      user,
    })
  }
}
