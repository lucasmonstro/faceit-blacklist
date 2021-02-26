import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';
import { User } from '../../../schemas/user.schema';
import { userMock, userRepositoryMock } from '../../../schemas/__mocks__/user.schema';
import { RemovePlayerFromBlacklistService } from './remove-player-from-blacklist.service';
describe('RemovePlayerFromBlacklistService', () => {
  let service: RemovePlayerFromBlacklistService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RemovePlayerFromBlacklistService,
        {
          provide: getModelToken(User.name),
          useValue: userRepositoryMock,
        },
      ],
    }).compile();
    service = module.get<RemovePlayerFromBlacklistService>(
      RemovePlayerFromBlacklistService
    );
  });
  it('should remove player from blacklist', async () => {
    const ownerFaceitId = faker.random.uuid();
    const faceitIdToRemove = faker.random.uuid();
    expect(await service.remove(ownerFaceitId, faceitIdToRemove)).toBe(userMock);
    expect(userRepositoryMock.findOneAndUpdate).toHaveBeenCalledWith(
      { faceitId: ownerFaceitId },
      { $pull: { blacklistedPlayers: { faceitId: faceitIdToRemove } } },
      { new: true }
    );
  });
});
