import { Either, left, right } from '@/core/either'
import { HashGenerator } from '../cryptography/hash-generator'
import { UsersRepository } from '../repositories/users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { User } from '../../enterprise/entities/user'

interface CreateUserUseCaseRequest {
    email: string
    name: string  
    nickname: string
    picture: string
    email_verified: boolean
    given_name: string
    family_name: string
    is_auth0_user: boolean
    createdAt: Date    
}
/* TODO - Alter type to UpdateAuth0User */
type CreateUserUseCaseResponse = Either<
  UserAlreadyExistsError,
  {
    user: User
  }
>

export class CreateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    email,
    name,
    nickname,
    picture,
    email_verified,
    given_name,
    family_name,
    is_auth0_user,
    createdAt,    
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const userWithSameEmail =
      await this.usersRepository.findByEmail(email)

    /* TODO - Change error to saveAuth0user */
      if (userWithSameEmail) {
     /* TODO - Alter to function UpdateAuth0User */
      return left(new UserAlreadyExistsError(email))
    }

    
    //const hashedPassword = await this.hashGenerator.hash(password)
    

    const user = User.create({
        email,
        name,
        nickname,
        picture,
        email_verified,
        given_name,
        family_name,
        is_auth0_user,
        createdAt,       
    })

    await this.usersRepository.create(user)

    return right({
      user,
    })
  }
}
