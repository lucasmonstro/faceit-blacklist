import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDoc } from '../../../schemas/user.schema';
@Injectable()
export class GetUserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDoc>
  ) {}
  async get(faceitId: string): Promise<User> {
    return this.userModel.findOne({ faceitId });
  }
}
