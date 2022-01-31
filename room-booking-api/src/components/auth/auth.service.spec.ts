import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { MongoMock } from '../../mock/mongoMock';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { User } from '../user/schemas/user.schema';
import { UserService } from '../user/user.service';

describe('AuthService', () => {
  let service: AuthService;
  let mongoMock: MongoMock = new MongoMock();

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60s' },
        }),
      ],
      providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mongoMock,
        },
      ],
    }).compile();

    service = moduleRef.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

describe('validateUser', () => {
  let service: AuthService;
  let mongoMock: MongoMock = new MongoMock();

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60s' },
        }),
      ],
      providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mongoMock,
        },
      ],
    }).compile();

    service = moduleRef.get<AuthService>(AuthService);
  });

  it('should return a user object when credentials are valid', async () => {
    // const res = await service.validateUser('maria', 'guess');
    // expect(res.userId).toEqual(3);
  });

  it('should return null when credentials are invalid', async () => {
    const res = await service.validateUser('xxx', 'xxx');
    expect(res).toBeNull();
  });
});

describe('validateLogin', () => {
  let service: AuthService;
  let mongoMock: MongoMock = new MongoMock();

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '2 days' },
        }),
      ],
      providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mongoMock,
        },
      ],
    }).compile();

    service = moduleRef.get<AuthService>(AuthService);
  });

  it('should return JWT object when credentials are valid', async () => {
    const res = await service.login({ email: 'maria', password: 'lala' });
    expect(res.access_token).toBeDefined();
  });
});
