import { Reason } from '@faceit-blacklist/interfaces';
import { Field, InputType } from '@nestjs/graphql';
import { ArrayUnique, IsEnum, IsNotEmpty, IsOptional, Length } from 'class-validator';
import { IsFaceitId } from '../validators/is-faceit-id.validator';
@InputType()
export class BlacklistedPlayerInput {
  @IsNotEmpty()
  @IsFaceitId()
  @Field()
  faceitId: string;
  @IsNotEmpty()
  @ArrayUnique()
  @IsEnum(Reason, { each: true })
  @Field(() => [Reason])
  reason: Reason[];
  @IsOptional()
  @Length(2, 100)
  @Field({ nullable: true })
  note?: string;
}
