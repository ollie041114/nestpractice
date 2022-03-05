import {
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { CreateBookmarkDto } from 'src/bookmark/dto';
import { EditUserDto } from 'src/user/dto/edit-user.dto';
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
    await app.listen(3000);
    // get the prisma database instantiated as the app provider
    prisma = app.get(PrismaService);
    // clean the database
    await prisma.cleanDb();

    // Set the base URL to match the future requests 
    pactum.request.setBaseUrl('http://localhost:3000');
  });
  
  // What happens after the testing is done
  afterAll(()=> {
    app.close();
  });

  describe('Auth', ()=>{
    describe('Signup', ()=> {
      it("Should sign up!", () => {
        const dto: AuthDto = {
          email: "vlad@gmail.com",
          password: '123'
        }
        return pactum.spec().post('/auth/signup')
        .withBody(dto)
        .expectStatus(201)
        .inspect();
      });
    });

    describe('Signin', ()=> {
      it("Should signin up!", () => {
        const dto: AuthDto = {
          email: "vlad@gmail.com",
          password: '123'
        }
        return pactum.spec().post('/auth/signin')
        .withBody(dto)
        .expectStatus(200)
        .stores('userAt', 'access_token');
        // stores the access token returned from the body to a userAt variable 
      });

      it("Should throw an exception if email is empty!", () => {
        const dto: AuthDto = {
          email: "",
          password: '123'
        }
        return pactum.spec().post('/auth/signin')
        .withBody(dto)
        .expectStatus(400)
        .inspect();
      });

      it("Should throw an exception if password is empty!", () => {
        const dto: AuthDto = {
          email: "vlad@gmail.com",
          password: ''
        }
        return pactum.spec().post('/auth/signin')
        .withBody(dto)
        .expectStatus(400)
        .inspect();
        // inspects lets you see what is returned from the request
      });

    });
  });

  describe('User', ()=>{
    describe('Get me', ()=> {
      it('should get different user', ()=>{
        return pactum
        .spec() 
        .get('/users/me')
        .withHeaders(
          {Authorization: 'Bearer $S{userAt}'}
          // S is for store
        )
        .inspect()
        .expectStatus(200);
      })
    });
    
    describe('Edit user', ()=> {
      it('should edit user', ()=>{
        const dto: EditUserDto = {
          firstName: "Vladimir",
          email: "vlad@codewithvlad.com"
        }
        return pactum
        .spec() 
        .patch('/users/edit')
        .withHeaders(
          {Authorization: 'Bearer $S{userAt}'}
          // S is for store
        )
        .withBody(dto)
        .inspect()
        .expectStatus(200)
        .expectBodyContains(dto.firstName)
        .expectBodyContains(dto.email); 
        // see if returned body contains the fields that we want (i.e. the ones we edited in)
      })
    });
    });


  describe('Bookmarks', ()=>{
    describe('Create bookmark', ()=> {
      const dto: CreateBookmarkDto = {
        title: 'First Bookmark',
        link: 'https://www.youtube.com/watch?v=0xJxgvJO2Xo&t=845s'
      }
      it("should create bookmark", ()=> {
        return pactum 
        .spec() 
        .post('/bookmarks')
        .withHeaders({
          Authorization: 'Bearer $S{userAt',
        })
        .withBody(dto)
        .expectStatus(201)
        .expectBody([]);
    })
    });
    describe('Get bookmarks', ()=> {
      
    });
    describe('Get bookmark by id', ()=> {});
    describe('Edit bookmark', ()=> {});
    describe('Delete bookmark', ()=> {});
    
  });
   
});