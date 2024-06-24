import { 
    BadRequestException, 
    Controller, 
    Delete, 
    HttpCode, 
    Param} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { NestDeleteAnswerCommentUseCase } from '@/infra/representations/nest-delete-answer-comment-use-case'

@Controller('/answers/comments/:id')
export class DeleteAnswerCommentController {
  constructor(private deleteAnswerComment: NestDeleteAnswerCommentUseCase) {}

  @Delete()
  @HttpCode(204)
  //Código 204 por não conter resposta e os headers serão importantes
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('id') answerCommentId: string,
  ) {
    const userId = user.sub
    // or const { sub: userId } = user

    const result = await this.deleteAnswerComment.execute({
      answerCommentId,
      authorId: userId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
