import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDoc } from '../../../schemas/user.schema';
@Injectable()
export class SignUpService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDoc>) {}
  async signUp(faceitId: string): Promise<UserDoc> {
    const user = await this.userModel.findOne({ faceitId });
    if (user) {
      return user;
    }
    return this.userModel.create({ faceitId });
  }
}
