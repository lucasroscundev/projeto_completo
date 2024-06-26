import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { CreateUserUseCase } from './create-user'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { makeUser } from 'test/factories/make-user'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryUsersRepository: InMemoryUsersRepository

let fakeHasher: FakeHasher
let sut: CreateUserUseCase

describe('Create User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()

    sut = new CreateUserUseCase(inMemoryUsersRepository, fakeHasher)
  })

  it('should be able to create a user', async () => {
    const newUser = makeUser(
      {
        email: 'example@mail.com',
      }, new UniqueEntityID('user-1'),
    )

    await inMemoryUsersRepository.create(newUser)

    
    
    const result = await sut.execute({
        email: newUser.email,
        name: 'John Doe',
        nickname: 'WhoAmI',
        picture: "???",
        emailVerified: true,
        givenName: 'John',
        familyName: 'Doe',
        isAuthUser: true,
        createdAt: new Date(),
    })

    expect(result).toBe(true)
    expect(inMemoryUsersRepository.items[0].email).toEqual(result.user.email)   
  })
})
