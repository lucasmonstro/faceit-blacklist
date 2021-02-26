import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BlacklistedPlayer } from './blacklisted-player.schema';
@ObjectType()
@Schema()
export class User {
  @Field(() => ID)
  @Prop({ unique: true, required: true })
  faceitId: string;
  @Field(() => [BlacklistedPlayer])
  @Prop([BlacklistedPlayer])
  blacklistedPlayers?: BlacklistedPlayer[];
}
export type UserDoc = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
