import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDoc } from '../../../schemas/user.schema';
import { BlacklistedPlayerInput } from '../../inputs/blacklisted-player.input';
@Injectable()
export class UpsertPlayerOnBlacklistService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDoc>) {}
  async upsert(faceitId: string, input: BlacklistedPlayerInput): Promise<User> {
    const { nModified: modifiedDocs } = await this.userModel.updateOne(
      { faceitId, 'blacklistedPlayers.faceitId': input.faceitId },
      { $set: { 'blacklistedPlayers.$': input } }
    );
    const shouldInsert = modifiedDocs === 0;
    if (shouldInsert) {
      await this.userModel.updateOne(
        { faceitId },
        { $addToSet: { blacklistedPlayers: input } }
      );
    }
    return this.userModel.findOne({ faceitId });
  }
}
