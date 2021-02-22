import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BlacklistedPlayer } from './blacklisted-player.schema';
@Schema()
export class User {
  @Prop({ unique: true, required: true })
  faceitId: string;
  @Prop([BlacklistedPlayer])
  blacklistedPlayers?: BlacklistedPlayer[];
}
export type UserDoc = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
