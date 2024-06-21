import { 
    BadRequestException, 
    Controller, 
    Delete, 
    HttpCode, 
    Param} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { NestDeleteQuestionCommentUseCase } from '@/infra/representations/nest-delete-question-comment-use-case'

@Controller('/questions/comments/:id')
export class DeleteQuestionCommentController {
  constructor(private deleteQuestionComment: NestDeleteQuestionCommentUseCase) {}

  @Delete()
  @HttpCode(204)
  //Código 204 por não conter resposta e os headers serão importantes
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('id') questionCommentId: string,
  ) {
    const userId = user.sub
    // or const { sub: userId } = user

    const result = await this.deleteQuestionComment.execute({
        questionCommentId,
      authorId: userId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
