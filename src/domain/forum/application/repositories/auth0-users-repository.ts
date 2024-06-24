import { PaginationParams } from '@/core/repositories/pagination-params'
import { Auth0User } from '../../enterprise/entities/auth0-user'

export abstract class Auth0UsersRepository {
  abstract findById(id: string): Promise<Auth0User | null>
  abstract findByEmail(email: string): Promise<Auth0User | null>
  //abstract findManyRecent(params: PaginationParams): Promise<Auth0User[]>
  abstract save(question: Auth0User): Promise<void>
  abstract create(question: Auth0User): Promise<void>
  abstract delete(question: Auth0User): Promise<void>
}