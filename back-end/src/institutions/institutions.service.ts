import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Institution } from './institution.entity';

@Injectable()
export class InstitutionsService {
  constructor(
    @InjectRepository(Institution)
    private readonly institutionRepository: Repository<Institution>,
  ) {}

  async findAll(): Promise<Institution[]> {
    return this.institutionRepository.find();
  }

  async findOne(id: number): Promise<Institution> {
    const institution = await this.institutionRepository.findOneBy({ id });
    if (!institution) {
      throw new NotFoundException(`Institution with ID ${id} not found`);
    }
    return institution;
  }

  async create(name: string, location: string): Promise<Institution> {
    const institution = this.institutionRepository.create({ name, location });
    return this.institutionRepository.save(institution);
  }

  async update(id: number, name: string, location: string): Promise<Institution> {
    const institution = await this.findOne(id);
    institution.name = name;
    institution.location = location;
    return this.institutionRepository.save(institution);
  }

  async delete(id: number): Promise<void> {
    const result = await this.institutionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Institution with ID ${id} not found`);
    }
  }
}
