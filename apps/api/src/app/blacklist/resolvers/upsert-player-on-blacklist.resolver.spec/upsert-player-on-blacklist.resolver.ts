import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../../../schemas/user.schema';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { BlacklistedPlayerInput } from '../../inputs/blacklisted-player.input';
import { UpsertPlayerOnBlacklistService } from '../../services/upsert-player-on-blacklist/upsert-player-on-blacklist.service';
@Resolver(() => User)
export class UpsertPlayerOnBlacklistResolver {
  constructor(
    private upsertPlayerOnBlacklistService: UpsertPlayerOnBlacklistService
  ) {}
  @Mutation(() => User)
  async upsertPlayerOnBlacklist(
    @CurrentUser('guid') ownerFaceitId: string,
    @Args('input') input: BlacklistedPlayerInput
  ): Promise<User> {
    return this.upsertPlayerOnBlacklistService.upsert(ownerFaceitId, input);
  }
}
