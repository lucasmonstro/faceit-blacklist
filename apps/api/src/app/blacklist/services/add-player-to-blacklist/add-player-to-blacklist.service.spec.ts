import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';
import { User } from '../../../schemas/user.schema';
import { userMock, userRepositoryMock } from '../../../schemas/__mocks__/user.schema';
import { CannotAddOwnerToYourOwnBlacklistException } from '../../exceptions/cannot-add-owner-to-your-own-blacklist.exception';
import { createAddPlayerToBlacklistInput } from '../../inputs/__mocks__/add-player-to-blacklist.input';
import { AddPlayerToBlacklistService } from '../../services/add-player-to-blacklist/add-player-to-blacklist.service';
describe('AddPlayerToBlacklistService', () => {
  let service: AddPlayerToBlacklistService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddPlayerToBlacklistService,
        {
          provide: getModelToken(User.name),
          useValue: userRepositoryMock,
        },
      ],
    }).compile();
    service = module.get<AddPlayerToBlacklistService>(
      AddPlayerToBlacklistService
    );
  });
  it('should throw CannotAddOwnerToYourOwnBlacklistException when adding owner to your own blacklist', async () => {
    const ownerFaceitId = faker.random.uuid();
    const input = createAddPlayerToBlacklistInput({ faceitId: ownerFaceitId });
    await expect(
      service.add(ownerFaceitId, input)
    ).rejects.toThrow(CannotAddOwnerToYourOwnBlacklistException);
  });
  it('should add player to blacklist', async () => {
    const ownerFaceitId = faker.random.uuid();
    const input = createAddPlayerToBlacklistInput();
    expect(await service.add(ownerFaceitId, input)).toBe(userMock);
    expect(userRepositoryMock.findOneAndUpdate).toHaveBeenCalledWith(
      { faceitId: ownerFaceitId },
      { $addToSet: { blacklistedPlayers: input } },
    );
  });
});
