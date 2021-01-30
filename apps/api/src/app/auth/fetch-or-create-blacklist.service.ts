import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blacklist, BlacklistDocument } from '../schemas/blacklist.schema';
@Injectable()
export class FetchOrCreateBlacklistService {
  constructor(
    @InjectModel(Blacklist.name)
    private blacklistModel: Model<BlacklistDocument>
  ) {}
  async fetchOrCreate(faceitId: string): Promise<BlacklistDocument> {
    const blacklist = await this.blacklistModel.findOne({ faceitId });
    if (blacklist) {
      return blacklist;
    }
    const blacklistToCreate = new this.blacklistModel({ faceitId });
    return await blacklistToCreate.save();
  }
}
