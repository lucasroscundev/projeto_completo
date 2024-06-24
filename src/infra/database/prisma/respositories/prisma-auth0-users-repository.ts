import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaQuestionMapper } from '../mappers/prisma-question-mapper'
import { Auth0UsersRepository } from '@/domain/forum/application/repositories/auth0-users-repository'
import { PrismaAuth0UserMapper } from '../mappers/prisma-auth0-user-mapper'
import { Auth0User } from '@/domain/forum/enterprise/entities/auth0-user'

@Injectable()
export class PrismaAuth0UsersRepository implements Auth0UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Auth0User | null> {
    const user = await this.prisma.auth0User.findUnique({
      where: {
        id,
      },
    })

    if (!user) {
      return null
    }

    return PrismaAuth0UserMapper.toDomain(user)
  }

  async findByEmail(email: string): Promise<Auth0User | null> {
    const user = await this.prisma.auth0User.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return null
    }

    return PrismaAuth0UserMapper.toDomain(user)
  }

  /*async findManyRecent({ page }: PaginationParams): Promise<Question[]> {
    const questions = await this.prisma.question.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return questions.map(PrismaQuestionMapper.toDomain)
  }*/

  async create(user: Auth0User): Promise<void> {
    const data = PrismaAuth0UserMapper.toPrisma(user)

    await this.prisma.auth0User.create({
      data,
    })
  }

  async save(user: Auth0User): Promise<void> {
    const data = PrismaAuth0UserMapper.toPrisma(user)

    await this.prisma.auth0User.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async delete(user: Auth0User): Promise<void> {
    const data = PrismaAuth0UserMapper.toPrisma(user)

    await this.prisma.auth0User.delete({
      where: {
        id: data.id,
      },
    })
  }
}