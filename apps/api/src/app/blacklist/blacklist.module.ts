import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { AddPlayerToBlacklistResolver } from './resolvers/add-player-to-blacklist/add-player-to-blacklist.resolver';
import { RemovePlayerFromBlacklistResolver } from './resolvers/remove-player-from-blacklist/remove-player-from-blacklist.resolver';
import { AddPlayerToBlacklistService } from './services/add-player-to-blacklist/add-player-to-blacklist.service';
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
    RemovePlayerFromBlacklistService,
    RemovePlayerFromBlacklistResolver,
    IsFaceitIdValidator,
  ],
})
export class BlacklistModule {}
