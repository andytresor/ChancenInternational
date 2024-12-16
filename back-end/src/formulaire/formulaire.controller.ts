import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { FormulaireService } from './formulaire.service';
import { CreateFormulaireDto } from 'src/dto/create-formulaire.dto';
import { Formulaire } from './formulaire.entity';
import { UpdateFormulaireDto } from 'src/dto/update-formulaire.dto';

@Controller('formulaire')
export class FormulaireController {
    constructor(private readonly formulaireService:FormulaireService){}

    @Post('create')
    async create(@Body() CreateFormulaireDto: CreateFormulaireDto):Promise<Formulaire> {
        return this.formulaireService.create(CreateFormulaireDto);
    }

    @Get('all')
    async findAll(): Promise<Formulaire[]> {
        return this.formulaireService.findAll();
    }

    @Get('one/:id')
    async findOne(@Param('id') id: number): Promise<Formulaire> {
        return this.formulaireService.findOne(id);
    }

    @Put('update/:id')
    async update(
        @Param('id') id: number, 
        @Body() updateFormulaireDto: UpdateFormulaireDto
    ): Promise<Formulaire> {
        return this.formulaireService.update(id, updateFormulaireDto);
    }

    @Delete('delete/:id')
    async remove(@Param('id') id: number): Promise<void> {
        return this.formulaireService.remove(id);
    }
}