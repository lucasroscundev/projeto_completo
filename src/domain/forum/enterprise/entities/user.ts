import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface UserProps {
  email: string
  name: string  
  nickname: string
  picture: string
  email_verified: boolean
  given_name: string
  family_name: string
  is_auth0_user: boolean
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

  get email_verified() {
    return this.props.email_verified
  }

  set email_verified(email_verified: boolean ) {
    this.props.email_verified = email_verified
    this.touch()
  }

  get given_name() {
    return this.props.given_name
  }

  set given_name(given_name: string) {
    this.props.given_name = given_name
    this.touch()
  }

  get family_name() {
    return this.props.family_name
  }

  set family_name(family_name: string) {
    this.props.family_name = family_name
    this.touch()
  }

  get is_auth0_user() {
    return this.props.is_auth0_user
  }

  set is_auth0_user(is_auth0_user: boolean) {
    this.props.is_auth0_user = is_auth0_user
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
    props: Optional<UserProps, 'nickname' | 'picture' | 'email_verified' | 'is_auth0_user' | 'createdAt'>, 
    id?: UniqueEntityID,
  ) {
    const user = new User(
      {
        ...props,
        nickname: props.nickname ?? "",
        picture: props.picture ?? "",
        email_verified: props.email_verified ?? true,
        is_auth0_user: props.is_auth0_user ?? true,
        createdAt: props.createdAt ?? new Date(),
      }, id)

    return user
  }


}
