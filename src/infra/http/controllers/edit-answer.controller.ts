import { 
    BadRequestException, 
    Body, 
    Controller, 
    HttpCode, 
    Param, 
    Put 
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { NestEditAnswerUseCase } from '@/infra/representations/nest-edit-answer-use-case'

const editAnswerBodySchema = z.object({
  content: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(editAnswerBodySchema)

type EditAnswerBodySchema = z.infer<typeof editAnswerBodySchema>

@Controller('/answers/:id')
export class EditAnswerController {
  constructor(private editAnswer: NestEditAnswerUseCase) {}

  @Put()
  @HttpCode(204)
  //Código 204 por não conter resposta e os headers serão importantes
  async handle(
    @Body(bodyValidationPipe) body: EditAnswerBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('id') answerId: string,
  ) {
    const { content } = body
    const userId = user.sub
    // or const { sub: userId } = user

    const result = await this.editAnswer.execute({
      content,
      answerId,
      authorId: userId,
      attachmentsIds: [],      
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
