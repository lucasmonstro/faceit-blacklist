import { Reason } from '@faceit-blacklist/interfaces';
import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';
import { AddPlayerToBlacklistService } from '../../services/add-player-to-blacklist/add-player-to-blacklist.service';
import { AddPlayerToBlacklistResolver } from './add-player-to-blacklist.resolver';
jest.mock('../../services/add-player-to-blacklist/add-player-to-blacklist.service');
describe('AddPlayerToBlacklistResolver', () => {
  let resolver: AddPlayerToBlacklistResolver;
  let service: AddPlayerToBlacklistService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddPlayerToBlacklistService, AddPlayerToBlacklistResolver],
    }).compile();
    resolver = module.get<AddPlayerToBlacklistResolver>(
      AddPlayerToBlacklistResolver
    );
    service = module.get<AddPlayerToBlacklistService>(
      AddPlayerToBlacklistService
    );
  });
  it('should add player to blacklist', async () => {
    const ownerFaceitId = faker.random.uuid();
    const addPlayerToBlacklistInput = {
      faceitId: faker.random.uuid(),
      reason: [faker.random.arrayElement(Object.values(Reason))],
      note: faker.lorem.sentence(),
    };
    expect(
      await resolver.addPlayerToBlacklist(
        ownerFaceitId,
        addPlayerToBlacklistInput
      )
    ).toBe(true);
    expect(service.add).toHaveBeenCalledWith(
      ownerFaceitId,
      addPlayerToBlacklistInput
    );
  });
});
