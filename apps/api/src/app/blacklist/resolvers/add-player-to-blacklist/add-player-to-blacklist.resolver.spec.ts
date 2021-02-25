import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';
import { createAddPlayerToBlacklistInput } from '../../inputs/__mocks__/add-player-to-blacklist.input';
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
    const input = createAddPlayerToBlacklistInput();
    expect(await resolver.addPlayerToBlacklist(ownerFaceitId, input)).toBe(true);
    expect(service.add).toHaveBeenCalledWith(ownerFaceitId, input);
  });
});
