import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { CreateUserUseCase } from './create-user'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { makeUser } from 'test/factories/make-user'

let inMemoryUsersRepository: InMemoryUsersRepository

let fakeHasher: FakeHasher
let sut: CreateUserUseCase

describe('Create User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()

    sut = new CreateUserUseCase(inMemoryUsersRepository, fakeHasher)
  })

  it('should be able to create a user', async () => {
    const question = makeUser()

    await inMemoryQuestionsRepository.create(question)

    
    
    const result = await sut.execute({
        email: 'johndoe@example.com',
        name: 'John Doe',
        nickname: 'WhoAmI',
        picture: "???",
        email_verified: true,
        given_name: 'John',
        family_name: 'Doe',
        is_auth0_user: true,
        createdAt: new Date(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryUsersRepository.items[0].email).toEqual(result.value.email)   
  })
})
