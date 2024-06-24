import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Injectable } from '@nestjs/common'
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug'

@Injectable()
export class NestGetQuestionBySlugUseCase extends GetQuestionBySlugUseCase {
  constructor(questionsRepository: QuestionsRepository) {
    super(questionsRepository)
  }
}
