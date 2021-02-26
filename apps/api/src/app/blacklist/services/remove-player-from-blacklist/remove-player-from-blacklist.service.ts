import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDoc } from '../../../schemas/user.schema';
@Injectable()
export class RemovePlayerFromBlacklistService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDoc>
  ) {}
  async remove(
    ownerFaceitId: string,
    faceitIdToRemove: string
  ): Promise<User> {
    return this.userModel.findOneAndUpdate(
      { faceitId: ownerFaceitId },
      { $pull: { blacklistedPlayers: { faceitId: faceitIdToRemove } } },
    );
  }
}
