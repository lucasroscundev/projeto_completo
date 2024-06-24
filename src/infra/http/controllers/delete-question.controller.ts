import { 
    BadRequestException, 
    Controller, 
    Delete, 
    HttpCode, 
    Param} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { NestDeleteQuestionUseCase } from '@/infra/representations/nest-delete-question-use-case'

@Controller('/questions/:id')
export class DeleteQuestionController {
  constructor(private deleteQuestion: NestDeleteQuestionUseCase) {}

  @Delete()
  @HttpCode(204)
  //Código 204 por não conter resposta e os headers serão importantes
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('id') questionId: string,
  ) {
    const userId = user.sub
    // or const { sub: userId } = user

    const result = await this.deleteQuestion.execute({
      questionId,
      authorId: userId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
