import { Test, TestingModule } from '@nestjs/testing';
import { CompanyService } from './company.service';
import { getModelToken } from '@nestjs/mongoose';
import { Company } from './schemas/company.schema';
import { CreateCompanyDto } from './dto/create-company.dto';
import { MongoMock } from '../../mock/mongoMock';

describe('CompanyService', () => {
  let service: CompanyService;
  const mongoMock: MongoMock = new MongoMock();

  const testData: CreateCompanyDto = {
    name: 'testCompany',
  };
  const testData2: CreateCompanyDto = {
    name: 'testCompany2',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        {
          provide: getModelToken(Company.name),
          useValue: mongoMock,
        },
      ],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be call the create method in the model', () => {
    expect(service.create).toBeDefined();
  });

  it('should add data', async () => {
    await service.create(testData);
    expect(mongoMock.data).toEqual([{ ...testData, _id: '0' }]);
  });

  it('should find all data', async () => {
    await service.create(testData2);
    const res = await service.findAll();

    expect(res).toEqual([
      { ...testData, _id: '0' },
      { ...testData2, _id: '1' },
    ]);
  });

  it('should find by id', async () => {
    const res = await service.findById('1');
    expect(res).toEqual({ ...testData2, _id: '1' });
  });

  it('should fail to find by id', async () => {
    const res = await service.findById('6');
    expect(res).toBeNull();
  });

  it('should delete data by id', async () => {
    expect(await service.findAll()).toEqual([
      { ...testData, _id: '0' },
      { ...testData2, _id: '1' },
    ]);

    const res = await service.delete('1');
    expect(res).toBeTruthy();

    expect(await service.findAll()).toEqual([{ ...testData, _id: '0' }]);
  });

  it('should fail to delete', async () => {
    expect(await service.findAll()).toEqual([{ ...testData, _id: '0' }]);

    const res = await service.delete('3');
    expect(res).toBeFalsy();

    expect(await service.findAll()).toEqual([{ ...testData, _id: '0' }]);
  });
});
