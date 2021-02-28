import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';
import { createBlacklistedPlayerInput } from '../../inputs/__mocks__/blacklisted-player.input';
import { UpsertPlayerOnBlacklistService } from '../../services/upsert-player-on-blacklist/upsert-player-on-blacklist.service';
import { UpsertPlayerOnBlacklistResolver } from './upsert-player-on-blacklist.resolver';
jest.mock('../../services/upsert-player-on-blacklist/upsert-player-on-blacklist.service');
describe('UpsertPlayerOnBlacklistResolver', () => {
  let resolver: UpsertPlayerOnBlacklistResolver;
  let service: UpsertPlayerOnBlacklistService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpsertPlayerOnBlacklistService, UpsertPlayerOnBlacklistResolver],
    }).compile();
    resolver = module.get<UpsertPlayerOnBlacklistResolver>(
      UpsertPlayerOnBlacklistResolver
    );
    service = module.get<UpsertPlayerOnBlacklistService>(
      UpsertPlayerOnBlacklistService
    );
  });
  it('should add player to blacklist', async () => {
    const ownerFaceitId = faker.random.uuid();
    const input = createBlacklistedPlayerInput();
    expect(await resolver.upsertPlayerOnBlacklist(ownerFaceitId, input)).toBe(true);
    expect(service.upsert).toHaveBeenCalledWith(ownerFaceitId, input);
  });
});
