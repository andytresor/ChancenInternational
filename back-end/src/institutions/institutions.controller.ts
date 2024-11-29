import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { InstitutionsService } from './institutions.service';
import { Institution } from './institution.entity';

@Controller('institutions')
export class InstitutionsController {
  constructor(private readonly institutionsService: InstitutionsService) {}

  @Get()
  async findAll(): Promise<Institution[]> {
    return this.institutionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Institution> {
    return this.institutionsService.findOne(+id);
  }

  @Post()
  async create(@Body() createDto: { name: string; location: string }): Promise<Institution> {
    const { name, location } = createDto;
    return this.institutionsService.create(name, location);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: { name: string; location: string },
  ): Promise<Institution> {
    const { name, location } = updateDto;
    return this.institutionsService.update(+id, name, location);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.institutionsService.delete(+id);
  }
}
