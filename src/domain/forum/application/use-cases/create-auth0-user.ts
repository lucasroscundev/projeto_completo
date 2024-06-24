import { Either, left, right } from '@/core/either'
import { HashGenerator } from '../cryptography/hash-generator'
import { Auth0UsersRepository } from '../repositories/auth0-users-repository'
import { Auth0User } from '../../enterprise/entities/auth0-user'
import { Auth0UserAlreadyExistsError } from './errors/auth0-user-already-exists-error'

interface RegisterAuth0UserUseCaseRequest {
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
type RegisterAuth0UserUseCaseResponse = Either<
  Auth0UserAlreadyExistsError,
  {
    user: Auth0User
  }
>

export class RegisterAuth0UserUseCase {
  constructor(
    private auth0usersRepository: Auth0UsersRepository,
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
  }: RegisterAuth0UserUseCaseRequest): Promise<RegisterAuth0UserUseCaseResponse> {
    const userWithSameEmail =
      await this.auth0usersRepository.findByEmail(email)

    /* TODO - Change error to saveAuth0user */
      if (userWithSameEmail) {
     /* TODO - Alter to function UpdateAuth0User */
      return left(new Auth0UserAlreadyExistsError(email))
    }

    
    //const hashedPassword = await this.hashGenerator.hash(password)
    

    const user = Auth0User.create({
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

    await this.auth0usersRepository.create(user)

    return right({
      user,
    })
  }
}
