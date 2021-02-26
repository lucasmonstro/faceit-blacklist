import { Query, Resolver } from '@nestjs/graphql';
import { User } from '../../../schemas/user.schema';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { GetUserService } from '../../services/get-user/get-user.service';
@Resolver(() => User)
export class GetCurrentUserResolver {
  constructor(
    private getUserService: GetUserService
  ) {}
  @Query(() => User)
  async getCurrentUser(
    @CurrentUser('guid') ownerFaceitId: string
  ): Promise<User> {
    return this.getUserService.get(ownerFaceitId);
  }
}
