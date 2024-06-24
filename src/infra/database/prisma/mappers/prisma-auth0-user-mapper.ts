import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Auth0User } from '@/domain/forum/enterprise/entities/auth0-user'
import { Auth0User as PrismaUser, Prisma } from '@prisma/client'

export class PrismaAuth0UserMapper {
  static toDomain(raw: PrismaUser): Auth0User {
    return Auth0User.create(
      {
        email: raw.email,
        name: raw.name,
        nickname: raw.nickname,
        picture: raw.picture || "No picture",
        email_verified: raw.email_verified ? true : true,
        given_name: raw.given_name,
        family_name: raw.family_name,
        is_auth0_user: raw.is_auth0_user,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,        
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(user: Auth0User): Prisma.Auth0UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      email: user.email,
      name: user.name,
      nickname: user.nickname,
      picture: user.picture || "No picture",
      email_verified: user.email_verified ? true : true,
      given_name: user.given_name,
      family_name: user.family_name,
      is_auth0_user: user.is_auth0_user,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt, 
    }
  }
}