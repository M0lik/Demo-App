import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company, CompanyDocument } from './schemas/company.schema';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const createdCompany = new this.companyModel(createCompanyDto);
    return createdCompany.save();
  }

  async findAll(): Promise<Company[]> {
    return this.companyModel.find().exec();
  }

  async findById(id: string): Promise<Company> {
    return this.companyModel.findById(id).exec();
  }

  async delete(id: string) {
    this.companyModel.deleteOne({ _id: id }).exec();
  }
}
