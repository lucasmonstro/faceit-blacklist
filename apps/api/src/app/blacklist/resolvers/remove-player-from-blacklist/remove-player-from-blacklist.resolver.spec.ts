import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';
import { userMock } from '../../../schemas/__mocks__/user.schema';
import { RemovePlayerFromBlacklistService } from '../../services/remove-player-from-blacklist/remove-player-from-blacklist.service';
import { RemovePlayerFromBlacklistResolver } from './remove-player-from-blacklist.resolver';
jest.mock('../../services/remove-player-from-blacklist/remove-player-from-blacklist.service');
describe('RemovePlayerFromBlacklistResolver', () => {
  let resolver: RemovePlayerFromBlacklistResolver;
  let service: RemovePlayerFromBlacklistService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RemovePlayerFromBlacklistResolver,
        RemovePlayerFromBlacklistService,
      ],
    }).compile();
    resolver = module.get<RemovePlayerFromBlacklistResolver>(
      RemovePlayerFromBlacklistResolver
    );
    service = module.get<RemovePlayerFromBlacklistService>(
      RemovePlayerFromBlacklistService
    );
  });
  it('should remove player from blacklist', async () => {
    const ownerFaceitId = faker.random.uuid();
    const faceitIdToRemove = faker.random.uuid();
    expect(
      await resolver.removePlayerFromBlacklist(ownerFaceitId, faceitIdToRemove)
    ).toBe(userMock);
    expect(service.remove).toHaveBeenCalledWith(
      ownerFaceitId,
      faceitIdToRemove
    );
  });
});
