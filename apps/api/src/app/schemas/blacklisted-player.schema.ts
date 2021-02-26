import { Reason } from '@faceit-blacklist/interfaces';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
@ObjectType()
@Schema({ _id: false })
export class BlacklistedPlayer {
  @Field(() => ID)
  @Prop({ index: true, required: true })
  faceitId: string;
  @Field(() => [Reason])
  @Prop({ type: [String], enum: Object.values(Reason), required: true })
  reason: Reason[];
  @Field()
  @Prop()
  note?: string;
}
registerEnumType(Reason, { name: 'Reason' });