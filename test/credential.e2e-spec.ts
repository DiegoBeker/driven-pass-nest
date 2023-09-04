import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { E2eUtils } from './utils/e2e-utils';
import { CredentialDto } from 'src/credential/dto/credential-dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

describe('Credentials (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService = new PrismaService();

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
    .overrideProvider(PrismaService)
    .useValue(prisma)
    .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    await E2eUtils.cleanDB(prisma);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  })

  it('POST /credentials => should return 201', async () => {
    const credentialDto: CredentialDto = {
        url: 'https://www.globo.com',
        title: 'twitch',
        username: 'DiegoBeker',
        password: 'Driven@123',
    }

    const createUserDto: CreateUserDto = {
        email: 'diego@email.com',
        password: 'Driven@123'
    }
    
    await request(app.getHttpServer())
      .post('/sign-up')
      .send(createUserDto)

    const { body } = await request(app.getHttpServer())
      .post('/sign-in')
      .send(createUserDto);
    
    return request(app.getHttpServer())
      .post('/credentials')
      .set('Authorization', `Bearer ${body.token}`)
      .send(credentialDto)
      .expect(HttpStatus.CREATED)
  });

  it('POST /credentials => should return 400', async () => {
    const credentialDto: any = {};

    const createUserDto: CreateUserDto = {
        email: 'diego@email.com',
        password: 'Driven@123'
    }
    
    await request(app.getHttpServer())
      .post('/sign-up')
      .send(createUserDto)

    const { body } = await request(app.getHttpServer())
      .post('/sign-in')
      .send(createUserDto);
    
    return request(app.getHttpServer())
      .post('/credentials')
      .set('Authorization', `Bearer ${body.token}`)
      .send(credentialDto)
      .expect(HttpStatus.BAD_REQUEST)
  });

  it('POST /credentials => should return 409', async () => {
    const credentialDto: CredentialDto = {
        url: 'https://www.globo.com',
        title: 'twitch',
        username: 'DiegoBeker',
        password: 'Driven@123',
    }
    
    const createUserDto: CreateUserDto = {
        email: 'diego@email.com',
        password: 'Driven@123'
    }
    
    const { body: user } = await request(app.getHttpServer())
      .post('/sign-up')
      .send(createUserDto)
    
    await prisma.credential.create({data: {...credentialDto, userId: user.id}})
    
    const { body } = await request(app.getHttpServer())
      .post('/sign-in')
      .send(createUserDto);
    
    return request(app.getHttpServer())
      .post('/credentials')
      .set('Authorization', `Bearer ${body.token}`)
      .send(credentialDto)
      .expect(HttpStatus.CONFLICT)
  });

  it('GET /credentials/:id => should return 404', async () => {

    const createUserDto: CreateUserDto = {
        email: 'diego@email.com',
        password: 'Driven@123'
    }
    
    await request(app.getHttpServer())
      .post('/sign-up')
      .send(createUserDto)

    const { body: user } = await request(app.getHttpServer())
      .post('/sign-in')
      .send(createUserDto);
    
    return request(app.getHttpServer())
      .get(`/credentials/${99999}`)
      .set('Authorization', `Bearer ${user.token}`)
      .expect(HttpStatus.NOT_FOUND)
  });

  it('GET /credentials/:id => should return 403', async () => {
    const credentialDto: CredentialDto = {
        url: 'https://www.globo.com',
        title: 'twitch',
        username: 'DiegoBeker',
        password: 'Driven@123',
    }

    const createUserDto: CreateUserDto = {
        email: 'diego@email.com',
        password: 'Driven@123'
    }
    
    await request(app.getHttpServer())
      .post('/sign-up')
      .send(createUserDto)

    const { body: user } = await request(app.getHttpServer())
      .post('/sign-in')
      .send(createUserDto);
    
      const { body: credential } = await request(app.getHttpServer())
      .post('/credentials')
      .set('Authorization', `Bearer ${user.token}`)
      .send(credentialDto)

    const createUserDto2: CreateUserDto = {
        email: 'diego2@email.com',
        password: 'Driven@123'
    }
    
    await request(app.getHttpServer())
      .post('/sign-up')
      .send(createUserDto2)

    const { body: user2 } = await request(app.getHttpServer())
      .post('/sign-in')
      .send(createUserDto2);

      return request(app.getHttpServer())
      .get(`/credentials/${credential.id}`)
      .set('Authorization', `Bearer ${user2.token}`)
      .expect(HttpStatus.FORBIDDEN)
  });

  it('GET /credentials => should return 200', async () => {
    const credentialDto: CredentialDto = {
        url: 'https://www.globo.com',
        title: 'twitch',
        username: 'DiegoBeker',
        password: 'Driven@123',
    }

    const createUserDto: CreateUserDto = {
        email: 'diego@email.com',
        password: 'Driven@123'
    }
    
    await request(app.getHttpServer())
      .post('/sign-up')
      .send(createUserDto)

    const { body: user } = await request(app.getHttpServer())
      .post('/sign-in')
      .send(createUserDto);

    await request(app.getHttpServer())
      .post('/credentials')
      .set('Authorization', `Bearer ${user.token}`)
      .send(credentialDto)
    
    return request(app.getHttpServer())
      .get(`/credentials`)
      .set('Authorization', `Bearer ${user.token}`)
      .expect(HttpStatus.OK)
  });

  it('DELETE /credentials/:id => should return 403', async () => {
    const credentialDto: CredentialDto = {
        url: 'https://www.globo.com',
        title: 'twitch',
        username: 'DiegoBeker',
        password: 'Driven@123',
    }

    const createUserDto: CreateUserDto = {
        email: 'diego@email.com',
        password: 'Driven@123'
    }
    
    await request(app.getHttpServer())
      .post('/sign-up')
      .send(createUserDto)

    const { body: user } = await request(app.getHttpServer())
      .post('/sign-in')
      .send(createUserDto);
    
      const { body: credential } = await request(app.getHttpServer())
      .post('/credentials')
      .set('Authorization', `Bearer ${user.token}`)
      .send(credentialDto)

    const createUserDto2: CreateUserDto = {
        email: 'diego2@email.com',
        password: 'Driven@123'
    }
    
    await request(app.getHttpServer())
      .post('/sign-up')
      .send(createUserDto2)

    const { body: user2 } = await request(app.getHttpServer())
      .post('/sign-in')
      .send(createUserDto2);

      return request(app.getHttpServer())
      .delete(`/credentials/${credential.id}`)
      .set('Authorization', `Bearer ${user2.token}`)
      .expect(HttpStatus.FORBIDDEN)
  });

  it('DELETE /credentials/:id => should return 404', async () => {

    const createUserDto: CreateUserDto = {
        email: 'diego@email.com',
        password: 'Driven@123'
    }
    
    await request(app.getHttpServer())
      .post('/sign-up')
      .send(createUserDto)

    const { body: user } = await request(app.getHttpServer())
      .post('/sign-in')
      .send(createUserDto);
    
    return request(app.getHttpServer())
      .delete(`/credentials/${99999}`)
      .set('Authorization', `Bearer ${user.token}`)
      .expect(HttpStatus.NOT_FOUND)
  });

});
