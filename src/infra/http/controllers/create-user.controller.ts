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
  import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator'
  import { Public } from '@/infra/auth/public'
import { UsersRepository } from '@/domain/forum/application/repositories/users-repository'
import { NestCreateUserUseCase } from '@/infra/representations/nest-create-user-use-case'
import { UserAlreadyExistsError } from '@/domain/forum/application/use-cases/errors/user-already-exists-error'
  
  const createUserBodySchema = z.object({
    email: z.string().email(),
    name: z.string(),
    nickname: z.string(),
    picture: z.string(),
    email_verified: z.boolean(),
    given_name: z.string(),
    family_name: z.string(),
    is_auth0_user: z.boolean(),
    createdAt: z.date(),
  })
  
  type CreateUserBodySchema = z.infer<typeof createUserBodySchema>
  
  @Controller('/users')
  @Public()
  export class CreateUserController {
    constructor(
      private createUser: NestCreateUserUseCase, /***** */
      private usersRepository: UsersRepository,
      private hashGenerator: HashGenerator,
    ) {}
  
    @Post()
    @HttpCode(201)
    @UsePipes(new ZodValidationPipe(createUserBodySchema))
    async handle(@Body() body: CreateUserBodySchema) {
      const { 
        email,
        name,
        nickname,
        picture,
        email_verified,
        given_name,
        family_name,
        is_auth0_user,
        createdAt } = body
  
      const result = await this.createUser.execute({
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
  
      /* TODO - Implement call to Update User */
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
  