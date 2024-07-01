import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface UserProps {
  email: string
  name: string  
  nickname: string
  picture: string
  emailVerified: boolean
  givenName: string
  familyName: string
  isAuthUser: boolean
  createdAt: Date
  updatedAt?: Date | null
 
}

export class User extends Entity<UserProps> {
   
  get email() {
    return this.props.email
  }

  set email(email: string) {
    this.props.email = email
    this.touch()
  }

  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get nickname() {
    return this.props.nickname
  }

  set nickname(nickname: string) {
    this.props.nickname = nickname
    this.touch()
  }

  get picture() {
    return this.props.picture
   }

  set picture(picture: string) {
    this.props.picture = picture
    this.touch()
  }   

  get emailVerified() {
    return this.props.emailVerified
  }

  set emailVerified(emailVerified: boolean ) {
    this.props.emailVerified = emailVerified
    this.touch()
  }

  get givenName() {
    return this.props.givenName
  }

  set givenName(givenName: string) {
    this.props.givenName = givenName
    this.touch()
  }

  get familyName() {
    return this.props.familyName
  }

  set familyName(familyName: string) {
    this.props.familyName = familyName
    this.touch()
  }

  get isAuthUser() {
    return this.props.isAuthUser
  }

  set isAuthUser(isAuthUser: boolean) {
    this.props.isAuthUser = isAuthUser
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }
  
  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<UserProps, 'nickname' | 'picture' | 'emailVerified' | 'isAuthUser' | 'createdAt'>, 
    id?: UniqueEntityID,
  ) {
    const user = new User(
      {
        ...props,
        nickname: props.nickname ?? "",
        picture: props.picture ?? "",
        emailVerified: props.emailVerified ?? true,
        isAuthUser: props.isAuthUser ?? true,
        createdAt: props.createdAt ?? new Date(),
      }, id)

    return user
  }


}
