import {
  //BadRequestException,
  Body,
  //ConflictException,
  Controller,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Redirect,
  UsePipes,
} from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { HashGenerator } from "@/domain/forum/application/cryptography/hash-generator";
import { Public } from "@/infra/auth/public";
import { UsersRepository } from "@/domain/forum/application/repositories/users-repository";
import { NestCreateUserUseCase } from "@/infra/representations/nest-create-user-use-case";
import { NestUpdateUserUseCase } from "@/infra/representations/nest-update-user-use-case";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
//import { UserAlreadyExistsError } from "@/domain/forum/application/use-cases/errors/user-already-exists-error";

const createUserBodySchema = z.object({
  email: z.string().email(),
  name: z.string(),
  nickname: z.string(),
  picture: z.string(),
  emailVerified: z.boolean(),
  givenName: z.string(),
  familyName: z.string(),
  isAuthUser: z.boolean(),
})

type CreateUserBodySchema = z.infer<typeof createUserBodySchema>;

@Controller("/users")
@Public()
export class CreateUserController {
  constructor(
    private createUser: NestCreateUserUseCase,
    private usersRepository: UsersRepository,
    private updateUser: NestUpdateUserUseCase,
    private hashGenerator: HashGenerator
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
      emailVerified,
      givenName,
      familyName,
      isAuthUser,
    } = body

    
    
    /*const userAlreadyExists = await this.usersRepository.findByEmail(email)*/
    
    const result = await this.createUser.execute({
      email,
      name,
      nickname,
      picture,
      emailVerified,
      givenName,
      familyName,
      isAuthUser,
      createdAt: new Date(),
    })
    
     
     

    return result
  }
  /*
  @Patch("/:id")
  @HttpCode(204)
  @UsePipes(new ZodValidationPipe(createUserBodySchema))
  
  async update(
    @Body() body: CreateUserBodySchema, 
    @Param('id') userId: string) {
    const {
      email,
      name,
      nickname,
      picture,
      emailVerified,
      givenName,
      familyName,
      isAuthUser,} = body
    
    // or const { sub: userId } = user

    const update = await this.updateUser.execute({
      email,
      name,
      nickname,
      picture,
      emailVerified,
      givenName,
      familyName,
      isAuthUser,          
    })

    if (update.isLeft()) {
      throw new ResourceNotFoundError()
    }
  }*/
}
