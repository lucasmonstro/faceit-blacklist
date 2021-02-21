import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BlacklistedPlayer } from './blacklisted-player.schema';
@Schema()
export class Blacklist {
  @Prop({ unique: true, required: true })
  faceitId: string;
  @Prop([BlacklistedPlayer])
  blacklistedPlayers?: BlacklistedPlayer[];
}
export type BlacklistDocument = Blacklist & Document;
export const BlacklistSchema = SchemaFactory.createForClass(Blacklist);
