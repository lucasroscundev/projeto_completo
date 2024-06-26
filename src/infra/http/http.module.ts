import { Module } from "@nestjs/common";
import { AuthenticateController } from "./controllers/authenticate.controller";
import { CreateAccountController } from "./controllers/create-account.controller";
import { CreateQuestionController } from "./controllers/create-question.controller";
import { FetchRecentQuestionsController } from "./controllers/fetch-recent-questions.controller";
import { DataBaseModule } from "../database/database.module";
import { NestCreateQuestionUseCase } from "../representations/nest-create-questions-use-case";
import { NestFetchRecentQuestionsUseCase } from "../representations/nest-fetch-recent-questions-use-case";
import { NestRegisterStudentUseCase } from "../representations/nest-register-student-use-case";
import { NestAuthenticateUseCase } from "../representations/nest-authenticate-use-case";
import { CryptographyModule } from "../cryptography/cryptography.module";
import { GetQuestionBySlugController } from "./controllers/get-question-by-slug.controller";
import { NestGetQuestionBySlugUseCase } from "../representations/nest-get-question-by-slug";
import { EditQuestionController } from "./controllers/edit-question.controller";
import { NestEditQuestionUseCase } from "../representations/nest-edit-question-use-case";
import { DeleteQuestionController } from "./controllers/delete-question.controller";
import { NestDeleteQuestionUseCase } from "../representations/nest-delete-question-use-case";
import { NestAnswerQuestionUseCase } from "../representations/nest-answer-question-use-case";
import { AnswerQuestionController } from "./controllers/answer-question.controller";
import { EditAnswerController } from "./controllers/edit-answer.controller";
import { NestEditAnswerUseCase } from "../representations/nest-edit-answer-use-case";
import { DeleteAnswerController } from "./controllers/delete-answer.controller";
import { NestDeleteAnswerUseCase } from "../representations/nest-delete-answer-use-case";
import { FetchQuestionAnswersController } from "./controllers/fetch-question-answers.controller";
import { NestFetchQuestionAnswersUseCase } from "../representations/nest-fetch-question-answers-use-case";
import { ChooseQuestionBestAnswerController } from "./controllers/choose-question-best-answer.controller";
import { NestChooseQuestionBestAnswerUseCase } from "../representations/nest-choose-question-best-answer-use-case";
import { CommentOnQuestionController } from "./controllers/comment-on-question.controller";
import { NestCommentOnQuestionUseCase } from "../representations/nest-comment-on-question-use-case";
import { DeleteQuestionCommentController } from "./controllers/delete-question-comment.controller";
import { NestDeleteQuestionCommentUseCase } from "../representations/nest-delete-question-comment-use-case";
import { CommentOnAnswerController } from "./controllers/comment-on-answer.controller";
import { NestCommentOnAnswerUseCase } from "../representations/nest-comment-on-answer-use-case";
import { DeleteAnswerCommentController } from "./controllers/delete-answer-comment.controller";
import { NestDeleteAnswerCommentUseCase } from "../representations/nest-delete-answer-comment-use-case";
import { CreateUserController } from "./controllers/create-user.controller";
import { NestCreateUserUseCase } from "../representations/nest-create-user-use-case";

@Module({
  imports: [DataBaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
    GetQuestionBySlugController,
    EditQuestionController,
    DeleteQuestionController,
    AnswerQuestionController,
    EditAnswerController,
    DeleteAnswerController,
    FetchQuestionAnswersController,
    ChooseQuestionBestAnswerController,
    CommentOnQuestionController,
    DeleteQuestionCommentController,
    CommentOnAnswerController,
    DeleteAnswerCommentController,
    CreateUserController,
  ],
  providers: [
    NestCreateQuestionUseCase,
    NestFetchRecentQuestionsUseCase,
    NestRegisterStudentUseCase,
    NestAuthenticateUseCase,
    NestGetQuestionBySlugUseCase,
    NestEditQuestionUseCase,
    NestDeleteQuestionUseCase,
    NestAnswerQuestionUseCase,
    NestEditAnswerUseCase,
    NestDeleteAnswerUseCase,
    NestFetchQuestionAnswersUseCase,
    NestChooseQuestionBestAnswerUseCase,
    NestCommentOnQuestionUseCase,
    NestDeleteQuestionCommentUseCase,
    NestCommentOnAnswerUseCase,
    NestDeleteAnswerCommentUseCase,
    NestCreateUserUseCase,
  ],
})
export class HttpModule {}
