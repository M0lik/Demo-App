import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
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

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<string> {
    await this.company.delete(id);
    return `id ${id} removed`;
  }
}
