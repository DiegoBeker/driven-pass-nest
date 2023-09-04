import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { E2eUtils } from './utils/e2e-utils';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

describe('Auth (e2e)', () => {
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

  it('POST /sign-up => should return 201', () => {
    const createUserDto: CreateUserDto = {
        email: 'diego@email.com',
        password: 'Driven@123'
    }
    return request(app.getHttpServer())
      .post('/sign-up')
      .send(createUserDto)
      .expect(HttpStatus.CREATED)
  });

  it('POST /sign-up => should return 400', () => {
    const createUserDto: any = {
        email: 'diego@email.com'
    }
    return request(app.getHttpServer())
      .post('/sign-up')
      .send(createUserDto)
      .expect(HttpStatus.BAD_REQUEST)
  });

  it('POST /sign-up => should return 400', () => {
    const createUserDto: any = {
        email: 'diego@email.com',
        password: 'senhaqualquer'
    }
    return request(app.getHttpServer())
      .post('/sign-up')
      .send(createUserDto)
      .expect(HttpStatus.BAD_REQUEST)
  });

  it('POST /sign-up => should return 400', () => {
    const createUserDto: any = {
        password: 'senhaqualquer'
    }
    return request(app.getHttpServer())
      .post('/sign-up')
      .send(createUserDto)
      .expect(HttpStatus.BAD_REQUEST)
  });

  it('POST /sign-up => should return 409', async () => {
    const createUserDto: CreateUserDto = {
        email: 'diego@email.com',
        password: 'Driven@123'
    }
    await prisma.user.create({data: createUserDto});

    return request(app.getHttpServer())
      .post('/sign-up')
      .send(createUserDto)
      .expect(HttpStatus.CONFLICT)
  });

  it('POST /sign-in => should return 200', async() => {
    const createUserDto: CreateUserDto = {
        email: 'diego@email.com',
        password: 'Driven@123'
    }
    
    await request(app.getHttpServer())
      .post('/sign-up')
      .send(createUserDto)

    const { status, body } = await request(app.getHttpServer())
      .post('/sign-in')
      .send(createUserDto);
      
      expect(status).toBe(HttpStatus.OK);
      expect(body).toEqual({
        token: expect.any(String)
      });

  });

  it('POST /sign-in => should return 401', async() => {
    const createUserDto: CreateUserDto = {
        email: 'diego@email.com',
        password: 'Driven@123'
    }
    
    await request(app.getHttpServer())
      .post('/sign-up')
      .send(createUserDto)

    const { status, body } = await request(app.getHttpServer())
      .post('/sign-in')
      .send({...createUserDto, password: 'Wr0ngp@ssword'});
      
      expect(status).toBe(HttpStatus.UNAUTHORIZED);
  });
  
});
