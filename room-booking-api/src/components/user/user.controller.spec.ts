import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongoMock } from '../../mock/mongoMock';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';

describe('UserController', () => {
  let controller: UserController;
  let mongoMock: MongoMock = new MongoMock();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers:[
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mongoMock,
        }
      ]
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
