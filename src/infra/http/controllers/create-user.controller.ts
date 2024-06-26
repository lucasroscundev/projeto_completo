import {
  //BadRequestException,
  Body,
  //ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { HashGenerator } from "@/domain/forum/application/cryptography/hash-generator";
import { Public } from "@/infra/auth/public";
import { UsersRepository } from "@/domain/forum/application/repositories/users-repository";
import { NestCreateUserUseCase } from "@/infra/representations/nest-create-user-use-case";
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
}
