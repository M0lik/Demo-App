import { Test, TestingModule } from '@nestjs/testing';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';
import { MongoMock } from '../../mock/mongoMock';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';

describe('UserService', () => {
  let service: UserService;
  let mongoMock: MongoMock = new MongoMock();

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [UserService, {
        provide: getModelToken(User.name),
        useValue: mongoMock,
      },],
    }).compile();

    service = moduleRef.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  // it.each`
  //   name      | returnVal
  //   ${'john'} | ${{ userId: 1, username: 'john', password: 'changeme' }}
  // `(
  //   'should call findOne for $name and return $returnVal',
  //   async ({ name, returnVal }: { name: string; returnVal: User }) => {
  //     expect(await service.findOne(name)).toEqual(returnVal);
  //   },
  // );
});
