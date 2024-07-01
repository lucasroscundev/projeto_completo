import { 
    BadRequestException, 
    Body, 
    Controller, 
    HttpCode, 
    Param, 
    Post, 
    Put 
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { NestUpdateUserUseCase } from '@/infra/representations/nest-update-user-use-case'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Public } from '@/infra/auth/public'

const updateUserBodySchema = z.object({
    email: z.string().email(),
    name: z.string(),
    nickname: z.string(),
    picture: z.string(),
    emailVerified: z.boolean(),
    givenName: z.string(),
    familyName: z.string(),
    isAuthUser: z.boolean(),
})

const bodyValidationPipe = new ZodValidationPipe(updateUserBodySchema)

type UpdateUserBodySchema = z.infer<typeof updateUserBodySchema>

@Controller('/users/:id')
@Public()
export class UpdateUserController {
  constructor(private updateUser: NestUpdateUserUseCase) {}

  @Post()
  @HttpCode(204)
  //Código 204 por não conter resposta e os headers serão importantes
  async handle(
    @Body(bodyValidationPipe) body: UpdateUserBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('id') userId: string,
  ) {
    const { 
        email,
        name,
        nickname,
        picture,
        emailVerified,
        givenName,
        familyName,
        isAuthUser, } = body
    
    // or const { sub: userId } = user

    const result = await this.updateUser.execute({
        email,
        name,
        nickname,
        picture,
        emailVerified,
        givenName,
        familyName,
        isAuthUser,      
    })

    if (result.isLeft()) {
      throw new ResourceNotFoundError()
    }
  }
}
