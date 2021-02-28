import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { GetCurrentUserResolver } from './resolvers/get-current-user/get-current-user.resolver';
import { RemovePlayerFromBlacklistResolver } from './resolvers/remove-player-from-blacklist/remove-player-from-blacklist.resolver';
import { UpsertPlayerOnBlacklistResolver } from './resolvers/upsert-player-on-blacklist.resolver.spec/upsert-player-on-blacklist.resolver';
import { GetUserService } from './services/get-user/get-user.service';
import { RemovePlayerFromBlacklistService } from './services/remove-player-from-blacklist/remove-player-from-blacklist.service';
import { UpsertPlayerOnBlacklistService } from './services/upsert-player-on-blacklist/upsert-player-on-blacklist.service';
import { IsFaceitIdValidator } from './validators/is-faceit-id.validator';
@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    GetUserService,
    GetCurrentUserResolver,
    RemovePlayerFromBlacklistService,
    RemovePlayerFromBlacklistResolver,
    UpsertPlayerOnBlacklistService,
    UpsertPlayerOnBlacklistResolver,
    IsFaceitIdValidator,
  ],
})
export class BlacklistModule {}
