import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDoc } from '../../../schemas/user.schema';
import { CannotAddOwnerToYourOwnBlacklistException } from '../../exceptions/cannot-add-owner-to-your-own-blacklist.exception';
import { AddPlayerToBlacklistInput } from '../../inputs/add-player-to-blacklist.input';
@Injectable()
export class AddPlayerToBlacklistService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDoc>
  ) {}
  async add(
    ownerFaceitId: string,
    input: AddPlayerToBlacklistInput
  ): Promise<true> {
    const isAddingOwner = ownerFaceitId === input.faceitId;
    if (isAddingOwner) {
      throw new CannotAddOwnerToYourOwnBlacklistException();
    }
    await this.userModel.updateOne(
      {
        faceitId: ownerFaceitId,
        'blacklistedPlayers.faceitId': { $ne: input.faceitId },
      },
      { $push: { blacklistedPlayers: input } },
    );
    return true;
  }
}
