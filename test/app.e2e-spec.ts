import {
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('App e2e', ()=> {
  let app: INestApplication;
  let prisma: PrismaService;
  // What happens before initializing the application
  beforeAll(async () => {
    //create a Nest application which will act as our server

    const moduleRef = 
      await Test.createTestingModule({
      // imports and compiles our AppModule so that we can test different routes
      // ...etc
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
   app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    // get the prisma database instantiated as the app provider
    prisma = app.get(PrismaService);
    // clean the database
    await prisma.cleanDb();
  });
  
  // What happens after the testing is done
  afterAll(()=> {
    app.close();
  });

  describe('Auth', ()=>{
    describe('Signup', ()=> {
      it.todo("Should sign up!");
    });

    describe('Signin', ()=> {});
  });

  describe('User', ()=>{
    describe('Get me', ()=> {});
    
    describe('Edit user', ()=> {});
  });

  describe('Bookmarks', ()=>{
    describe('Create bookmark', ()=> {});
    describe('Get bookmarks', ()=> {});
    describe('Get bookmark by id', ()=> {});
    describe('Edit bookmark', ()=> {});
    describe('Delete bookmark', ()=> {});
    
  });
   
});