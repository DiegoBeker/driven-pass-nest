import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const user = await this.userRepository.getUserByEmail(email);
    if (user) throw new ConflictException('Username already in use.');

    return await this.userRepository.create(createUserDto);
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.getUserByEmail(email);
  }

  async getUserById(id: number) {
    return await this.userRepository.getUserById(id);
  }

  async remove(user: User) {
    return this.userRepository.remove(user.id);
  }
}
