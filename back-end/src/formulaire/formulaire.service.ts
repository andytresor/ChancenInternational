import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Formulaire } from './formulaire.entity';
import { CreateFormulaireDto } from '../dto/create-formulaire.dto';
import { UpdateFormulaireDto } from '../dto/update-formulaire.dto';
import { courses } from '../courses/courses.entity';
import { Institution } from '../institutions/institution.entity';
import * as nodemailer from 'nodemailer';
import * as crypto from 'crypto'; // For generating a secure password
import { User } from 'src/auth/user.entity';

@Injectable()
export class FormulaireService {
  constructor(
    @InjectRepository(Formulaire)
    private readonly formulaireRepository: Repository<Formulaire>,
    @InjectRepository(courses)
    private readonly courseRepository: Repository<courses>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // Inject User repository
    @InjectRepository(Institution)
    private readonly institutionRepository: Repository<Institution>,
  ) {}

  // Créer un nouveau formulaire
  async create(createFormulaireDto: CreateFormulaireDto): Promise<Formulaire> {
    const course = await this.courseRepository.findOne({ where: { id: createFormulaireDto.course_id } });
    const institution = await this.institutionRepository.findOne({ where: { id: createFormulaireDto.institution_id } });
    // const formulaire = this.formulaireRepository.create({ ...createFormulaireDto, courses: course ?[course] :[], institution });
    const {name,email,contact,reason}=createFormulaireDto
    const formulaire = this.formulaireRepository.create({name,email,contact,reason, institution, course})
    return await this.formulaireRepository.save(formulaire);
  }

  // Récupérer tous les formulaires
  async findAll(): Promise<Formulaire[]> {
    return await this.formulaireRepository.find();
  }

  // Récupérer un formulaire par son ID
  async findOne(id: number): Promise<Formulaire> {
    return await this.formulaireRepository.findOne({ where: { id } });
  }

  // Mettre à jour un formulaire
  async update(id: number, updateFormulaireDto: UpdateFormulaireDto): Promise<Formulaire> {
    const course = updateFormulaireDto.course_id ? await this.courseRepository.findOne({ where: { id: updateFormulaireDto.course_id } }) : null;
    const institution = updateFormulaireDto.institution_id ? await this.institutionRepository.findOne({ where: { id: updateFormulaireDto.institution_id } }) : null;

    const{name,email,contact,raison_de_la_demande,course_id,institution_id} = updateFormulaireDto
    const updateData = ({name,email,contact,raison_de_la_demande,course_id,institution_id,institution})
    // const updateData :Partial<Formulaire> = { ...updateFormulaireDto, courses: course ? [course] : [], institution  };
    return  await this.formulaireRepository.update(id, updateData).then(() => this.findOne(id));
  
  }

  // Supprimer un formulaire
  async remove(id: number): Promise<void> {
    await this.formulaireRepository.delete(id);
  }

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use your email service
      auth: {
        user: 'tresorkengne45@gmail.com',
        pass: 'bhkd qfzi cuwh rluu', // Use environment variables for security
      },
    });

    await transporter.sendMail({
      from: '"Admin" tresorkengne45@gmail.com',
      to,
      subject,
      text,
    });
  }

  async acceptRequest(id: number): Promise<string> {
    // Find the formulaire request
    const formulaire = await this.formulaireRepository.findOne({ where: { id } });
    if (!formulaire) {
      throw new NotFoundException('Formulaire request not found');
    }

    // Generate a random password
    const generatedPassword = crypto.randomBytes(8).toString('hex'); // 16-character password

    // Create a new user
    const newUser = this.userRepository.create({
      name: formulaire.name,
      email: formulaire.email,
      password: generatedPassword,
      role: 'student', // Set default role to student
    });

    // Hash the password before saving
    await newUser.hashPassword();
    await this.userRepository.save(newUser);

    // Delete the formulaire request after processing
    // await this.formulaireRepository.delete(id);

    // Return the generated password for email purposes
    return generatedPassword;
  }

  async dismissRequest(id: number): Promise<void> {
    const request = await this.formulaireRepository.findOne({ where: { id } });
    if (!request) throw new Error('Request not found');

    // Send email
    await this.sendEmail(
      request.email,
      'Your Request Has Been Dismissed',
      `Hello ${request.name},\n\nWe regret to inform you that your request has not been granted. Your data has been deleted.\n\nThank you for your understanding.`
    );

    // Delete the request
    await this.formulaireRepository.delete(id);
  }
}
