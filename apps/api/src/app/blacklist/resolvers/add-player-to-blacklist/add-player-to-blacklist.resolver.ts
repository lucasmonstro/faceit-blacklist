import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '../../../schemas/user.schema';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { AddPlayerToBlacklistInput } from '../../inputs/add-player-to-blacklist.input';
import { AddPlayerToBlacklistService } from '../../services/add-player-to-blacklist/add-player-to-blacklist.service';
@Resolver(() => User)
export class AddPlayerToBlacklistResolver {
  constructor(
    private addPlayerToBlacklistService: AddPlayerToBlacklistService
  ) {}
  @Mutation(() => User)
  async addPlayerToBlacklist(
    @CurrentUser('guid') ownerFaceitId: string,
    @Args('input') input: AddPlayerToBlacklistInput
  ): Promise<User> {
    return this.addPlayerToBlacklistService.add(ownerFaceitId, input);
  }
  // TODO: remove when any query was added since graphql always require a root query
  @Query(() => Boolean)
  async helloWorld(): Promise<boolean> {
    return true;
  }
}
