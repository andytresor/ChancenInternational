import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { FormulaireService } from './formulaire.service';
import { CreateFormulaireDto } from 'src/dto/create-formulaire.dto';
import { Formulaire } from './formulaire.entity';
import { MailerService } from 'src/auth/Mailer.service';
import { UpdateFormulaireDto } from 'src/dto/update-formulaire.dto';

@Controller('request')
export class FormulaireController {
  constructor(
    private readonly formulaireService: FormulaireService,
    private readonly mailerService: MailerService
  ) { }

  @Post('create')
  async create(@Body() CreateFormulaireDto: CreateFormulaireDto): Promise<Formulaire> {
    return this.formulaireService.create(CreateFormulaireDto);
  }

  @Get('')
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

  @Post('accept/:id')
  async acceptRequest(@Param('id') id: number): Promise<string> {
    // Fetch user details for sending email BEFORE processing the request
    const formulaire = await this.formulaireService.findOne(id);

    if (!formulaire) {
      throw new NotFoundException(`Formulaire with ID ${id} not found`);
    }

    // Process the request and generate the password
    const generatedPassword = await this.formulaireService.acceptRequest(id);

    // Send an email with the generated password
    await this.formulaireService.sendEmail(
      formulaire.email,
      'Request Accepted',
      `Your request has been accepted! Here are your credentials:
    
    Email: ${formulaire.email}
    Password: ${generatedPassword}
    
    Use this link to log in: http://localhost:5173/auth/login`
    );

    return 'User created and email sent successfully.';
  }


  @Post('dismiss/:id')
  async dismissRequest(@Param('id') id: number): Promise<void> {
    await this.formulaireService.dismissRequest(id);
  }
}
