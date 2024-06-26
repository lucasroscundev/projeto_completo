import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Create user (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[POST] / users', async () => {
    const response = await request(app.getHttpServer()).post('/users').send({
      email: 'johndoe@example.com',
      name: 'John Doe',
      nickname: "Who?",
      picture: "???",
      emailVerified: true,
      givenName: "John",
      familyName: "Doe",
      isAuthUser: true
    })

    expect(response.statusCode).toBe(201)

    const userOnDatabase = await prisma.client.findUnique({
      where: {
        email: 'johndoe@example.com',
      },
    })

    expect(userOnDatabase).toBeTruthy()
  })
})
