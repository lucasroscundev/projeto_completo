import { 
    BadRequestException, 
    Controller, 
    Delete, 
    HttpCode, 
    Param} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { NestDeleteAnswerUseCase } from '@/infra/representations/nest-delete-answer-use-case'

@Controller('/answers/:id')
export class DeleteAnswerController {
  constructor(private deleteAnswer: NestDeleteAnswerUseCase) {}

  @Delete()
  @HttpCode(204)
  //Código 204 por não conter resposta e os headers serão importantes
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('id') answerId: string,
  ) {
    const userId = user.sub
    // or const { sub: userId } = user

    const result = await this.deleteAnswer.execute({
        answerId,
      authorId: userId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
