import { Test, TestingModule } from '@nestjs/testing';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { getModelToken } from '@nestjs/mongoose';
import { MongoMock } from '../../mock/mongoMock';
import { Company } from './schemas/company.schema';

describe('CompanyController', () => {
  let controller: CompanyController;
  const mongoMock: MongoMock = new MongoMock();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [
        CompanyService,
        {
          provide: getModelToken(Company.name),
          useValue: mongoMock,
        },
      ],
    }).compile();

    controller = module.get<CompanyController>(CompanyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
