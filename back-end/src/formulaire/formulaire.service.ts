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
import { v4 as uuid } from 'uuid'; // Import UUID generator
import { Student } from 'src/students/student.entity';

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
    @InjectRepository(Institution)
    private readonly studentRepository: Repository<Student>,
  ) {}

  // Créer un nouveau formulaire
  async create(createFormulaireDto: CreateFormulaireDto): Promise<Formulaire> {
    const { name, email, contact, reason, studentId, course_id, institution_id } = createFormulaireDto;

    // Fetch the associated course and institution
    const course = await this.courseRepository.findOne({ where: { id: course_id } });
    const institution = await this.institutionRepository.findOne({ where: { id: institution_id } });

    if (!course) {
      throw new Error('Course not found.');
    }

    if (!institution) {
      throw new Error('Institution not found.');
    }

    // Handle temporary student ID if student does not exist yet
    let temporaryStudentId: string | null = null;
    if (!studentId) {
      temporaryStudentId = uuid(); // Generate a unique temporary identifier
    }

    // Create the formulaire entity
    const formulaire = this.formulaireRepository.create({
      name,
      email,
      contact,
      reason,
      institution,
      course,
      temporaryStudentId,
    });

    // Save and return the new formulaire
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

  async findTuitionFeeByStudentId(studentId: number): Promise<number | null> {
    const request = await this.formulaireRepository.findOne({
      where: { student: { id: studentId } },
      relations: ['student'],
    });

    return request ? request.course?.amount : null;
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
    // Fetch the request
    const request = await this.formulaireRepository.findOne({ where: { id }, relations: ['student'] });
    if (!request) {
      throw new NotFoundException('Request not found');
    }
  
    const { email, name, student } = request;
  
    // Send dismissal email
    await this.sendEmail(
      email,
      'Your Request Has Been Dismissed',
      `Hello ${name},\n\nWe regret to inform you that your request has not been granted. Your data has been deleted.\n\nThank you for your understanding.`
    );
  
    // Remove the student entry if it exists
    if (student) {
      await this.studentRepository.delete(student.id); // Ensure no foreign key reference remains
    }
  
    // Delete the request
    await this.formulaireRepository.delete(id);
  
    // Remove the user entry (if applicable)
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      await this.userRepository.delete(user.id);
    }
  }
  
}
