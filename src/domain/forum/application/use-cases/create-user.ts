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
    emailVerified: boolean
    givenName: string
    familyName: string
    isAuthUser: boolean
    createdAt: Date    
}

type CreateUserUseCaseResponse =  
  {
    user: User
  }


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
    emailVerified,
    givenName,
    familyName,
    isAuthUser,
    createdAt,    
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const userAlreadyExists =
       await this.usersRepository.findByEmail(email)

    const user = User.create({
    email,
    name,
    nickname,
    picture,
    emailVerified,
    givenName,
    familyName,
    isAuthUser,
    createdAt,       
    })

    
    if(userAlreadyExists) {
      await this.usersRepository.update(user)      
    }    
    
    await this.usersRepository.create(user)

    return ({
      user,
    })
  }
}
