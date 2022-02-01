import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from './schemas/company.schema';

@Controller('company')
export class CompanyController {
  constructor(private company: CompanyService) {}

  @Post()
  async create(@Body() createcompanyDto: CreateCompanyDto) {
    return this.company.create(createcompanyDto);
  }

  @Get()
  async findAll(): Promise<Company[]> {
    return this.company.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Company> {
    const res = await this.company.findById(id);
    if (res == null)
      throw new HttpException(`id ${id} not found`, HttpStatus.NOT_FOUND);
    else return res;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<string> {
    const res = await this.company.delete(id);
    if (res) return `id ${id} removed`;
    else throw new HttpException(`id ${id} not found`, HttpStatus.NOT_FOUND);
  }
}
