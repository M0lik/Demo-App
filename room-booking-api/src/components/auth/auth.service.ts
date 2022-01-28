import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../user/schemas/user.schema';
import { ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      return null;
    }
    const valid = await bcrypt.compare(pass, user.password);
    if (valid) {
      return user;
    }
    return null;
  }

  async signUp(authCredentialsDto: CreateUserDto): Promise<User> {
    return this.userService.create(authCredentialsDto);
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user._id,
      company: user.company,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
