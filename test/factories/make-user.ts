import { faker } from "@faker-js/faker"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Injectable } from "@nestjs/common"
import { PrismaService } from "@/infra/database/prisma/prisma.service"
import { PrismaUserMapper } from "@/infra/database/prisma/mappers/prisma-user-mapper"
import { User, UserProps } from "@/domain/forum/enterprise/entities/user"

export function makeUser(
  override: Partial<UserProps> = {},
  id?: UniqueEntityID,
) {
  const user = User.create(
    {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      nickname: faker.person.middleName(),
      picture: faker.image.url(),
      emailVerified: true,
      givenName: faker.person.firstName(),
      familyName: faker.person.lastName(),
      isAuthUser: true,
      createdAt: new Date(),

      ...override,
    },
    id
  )

  return user
}

@Injectable()
export class UserFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaUser(data: Partial<UserProps> = {}): Promise<User> {
    const user = makeUser(data)

    await this.prisma.client.create({
      data: PrismaUserMapper.toPrisma(user),
    })

    return user
  }
}
