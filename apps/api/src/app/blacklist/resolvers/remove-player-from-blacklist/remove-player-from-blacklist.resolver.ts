import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../../../schemas/user.schema';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { RemovePlayerFromBlacklistService } from '../../services/remove-player-from-blacklist/remove-player-from-blacklist.service';
@Resolver(() => User)
export class RemovePlayerFromBlacklistResolver {
  constructor(
    private removePlayerFromBlacklistService: RemovePlayerFromBlacklistService
  ) {}
  @Mutation(() => User)
  async removePlayerFromBlacklist(
    @CurrentUser('guid') ownerFaceitId: string,
    @Args('faceitId', { type: () => ID }) faceitIdToRemove: string
  ): Promise<User> {
    return this.removePlayerFromBlacklistService.remove(
      ownerFaceitId,
      faceitIdToRemove
    );
  }
}
