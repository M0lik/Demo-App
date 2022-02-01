import { Test, TestingModule } from '@nestjs/testing';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';
import { MongoMock } from '../../mock/mongoMock';
import { getModelToken } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';

const createData: CreateUserDto = {
  company: '61efce6dec6862b4eb5da3f3',
  username: 'username1',
  password: 'pwd1',
};

const createData2: CreateUserDto = {
  company: '61efce6dec6862b4eb5da3f3',
  username: 'username2',
  password: 'pwd2',
};

describe('UserService', () => {
  let service: UserService;
  const mongoMock: MongoMock = new MongoMock();

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mongoMock,
        },
      ],
    }).compile();

    service = moduleRef.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to find user by username', async () => {
    mongoMock.data = [createData, createData2];
    let res = await service.findByUsername('username2');
    expect(res).toEqual(createData2);
    res = await service.findByUsername('username1');
    expect(res).toEqual(createData);
  });
});
