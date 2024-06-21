import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { Public } from '@/infra/auth/public'
import { NestRegisterUserUseCase } from '@/infra/representations/nest-register-user-use-case'
import { UsersRepository } from '@/domain/forum/application/repositories/users-repository'
import { UserAlreadyExistsError } from '@/domain/forum/application/use-cases/errors/user-already-exists-error'
import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator'

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  nickname: z.string(),
  picture: z.string(), 
  given_name: z.string(), 
  family_name: z.string(),      
})

const bodyValidationPipe = new ZodValidationPipe(createAccountBodySchema)

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
@Public()
export class CreateAccountController {
  constructor(
    private registerUser: NestRegisterUserUseCase,
    private userRepository: UsersRepository,
    private hashGenerator: HashGenerator,    
  ) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body(bodyValidationPipe) body: CreateAccountBodySchema) {
    const { 
      name, 
      email, 
      password, 
      nickname,
      picture,      
      given_name, 
      family_name,      
      } = body

    const result = await this.registerUser.execute({
      name,
      email,
      password,
      nickname,
      picture,
      email_verified: true,       
      given_name, 
      family_name,
      is_auth0_user: true,
      createdAt: new Date(),       
    })

    if (result.isLeft()) {
      
      const error = result.value

      switch (error.constructor) {
        case UserAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
