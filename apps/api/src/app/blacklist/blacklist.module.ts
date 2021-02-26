import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { AddPlayerToBlacklistResolver } from './resolvers/add-player-to-blacklist/add-player-to-blacklist.resolver';
import { GetCurrentUserResolver } from './resolvers/get-current-user/get-current-user.resolver';
import { RemovePlayerFromBlacklistResolver } from './resolvers/remove-player-from-blacklist/remove-player-from-blacklist.resolver';
import { AddPlayerToBlacklistService } from './services/add-player-to-blacklist/add-player-to-blacklist.service';
import { GetUserService } from './services/get-user/get-user.service';
import { RemovePlayerFromBlacklistService } from './services/remove-player-from-blacklist/remove-player-from-blacklist.service';
import { IsFaceitIdValidator } from './validators/is-faceit-id.validator';
@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    AddPlayerToBlacklistService,
    AddPlayerToBlacklistResolver,
    GetUserService,
    GetCurrentUserResolver,
    RemovePlayerFromBlacklistService,
    RemovePlayerFromBlacklistResolver,
    IsFaceitIdValidator,
  ],
})
export class BlacklistModule {}
