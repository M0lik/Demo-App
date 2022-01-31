import { Test, TestingModule } from '@nestjs/testing';
import { CompanyService } from './company.service';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Company, CompanyDocument } from './schemas/company.schema';
import { Model } from 'mongoose';
import { CreateCompanyDto } from './dto/create-company.dto';

describe('CompanyService', () => {
  let service: CompanyService;
  let spyModel: Model<CompanyDocument>;
  let data: any[] = [];

  const testData: CreateCompanyDto = {
    name: 'testCompany',
  };
  const testData2: CreateCompanyDto = {
    name: 'testCompany2',
  };

  beforeEach(async () => {
    const productMockRepository = {
      find: () => {
        return { exec: jest.fn(() => data) };
      },
      create: jest.fn((dataDto: CreateCompanyDto) => {
        data.push({ ...dataDto, _id: data.length.toString() });
      }),
      findById: (id: string) => {
        return {
          exec: jest.fn(() => {
            const tmpData = data.find((e) => e._id === id);
            if (tmpData === undefined) return null;
            else return tmpData;
          }),
        };
      },
      deleteOne: ({ _id }) => {
        return {
          exec: jest.fn(() => {
            if (data.find((e) => e._id === _id) === undefined) {
              return { deletedCount: 0 };
            }
            data = data.filter((e) => e._id !== _id);
            return { deletedCount: 1 };
          }),
        };
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        {
          provide: getModelToken(Company.name),
          useValue: productMockRepository,
        },
      ],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
    spyModel = module.get<Model<CompanyDocument>>(getModelToken(Company.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be call the create method in the model', () => {
    expect(service.create).toBeDefined();
  });

  it('should add data', async () => {
    await service.create(testData);
    expect(data).toEqual([{ ...testData, _id: '0' }]);
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

// async findAll(): Promise<Company[]> {
//   return this.companyModel.find().exec();
// }

// async findById(id: string): Promise<Company> {
//   return this.companyModel.findById(id).exec();
// }

// async delete(id: string) {
//   this.companyModel.deleteOne({ _id: id }).exec();
// }
