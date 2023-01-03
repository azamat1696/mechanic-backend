/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Entities
import { User } from '../user.entity';

// Dtos
import { CreateUsersDto } from '../../merchants/dto/users/create.dto';

// Utils
// import { encodePassword } from '../../utils/encodePassword';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    return await this.usersRepository.findOneBy({ id });
  }

  async findByEmail(email: string) {
    console.log('email', email);
    return await this.usersRepository.findOneBy({ email });
  }

  async findCustomersByMerchant(id: number) {
    const customers = await this.usersRepository.find({
      where: {
        merchantId: id,
      },
    });

    if (customers) {
      return customers;
    }
  }

  async remove(id: number) {
    return await this.usersRepository.delete(id);
  }

  async add(createUsersDto: CreateUsersDto, merchant: any) {
    const foundUser = await this.usersRepository.findOneBy({
      email: createUsersDto.email,
    });

    if (!foundUser) {
      // const password = encodePassword(createUsersDto.password);
      // const newUser = this.usersRepository.create({
      //   ...createUsersDto,
      //   password,
      // });

      const newUser = this.usersRepository.create({
        ...createUsersDto,
        merchant,
      });
      return this.usersRepository.save(newUser);
    } else {
      return 'User already exists!';
    }
  }

  async update(id: number, updateUsersDto: any) {
    try {
      const updatedUser = await this.usersRepository.update(id, updateUsersDto);

      if (updatedUser) {
        try {
          const user = await this.usersRepository.findOneBy({ id });
          console.log('user', user);
          return user;
        } catch (err) {
          console.log('err', err);
          return err;
        }
      }
    } catch (err) {
      console.log('err', err);
    }
  }
}
