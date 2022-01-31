import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company, CompanyDocument } from './schemas/company.schema';
import { Types } from 'mongoose';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const createdCompany = await this.companyModel.create(createCompanyDto);
    return createdCompany;
  }

  async findAll(): Promise<Company[]> {
    return this.companyModel.find().exec();
  }

  async findById(id: string): Promise<Company> {
    return this.companyModel.findById(id).exec();
  }

  async delete(id: string) : Promise<boolean> {
    const result = await this.companyModel.deleteOne({ _id: id }).exec();
    return result.deletedCount > 0;
  }
}
