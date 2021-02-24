import { Reason } from '@faceit-blacklist/interfaces';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';
import { User } from '../../../schemas/user.schema';
import { userRepositoryMock } from '../../../schemas/__mocks__/user.schema';
import { CannotAddOwnerToYourOwnBlacklistException } from '../../exceptions/cannot-add-owner-to-your-own-blacklist.exception';
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
    const addPlayerToBlacklistInput = {
      faceitId: ownerFaceitId,
      reason: [faker.random.arrayElement(Object.values(Reason))],
      note: faker.lorem.sentence(),
    };
    await expect(
      service.add(ownerFaceitId, addPlayerToBlacklistInput)
    ).rejects.toThrow(CannotAddOwnerToYourOwnBlacklistException);
  });
  it('should add player to blacklist', async () => {
    const ownerFaceitId = faker.random.uuid();
    const addPlayerToBlacklistInput = {
      faceitId: faker.random.uuid(),
      reason: [faker.random.arrayElement(Object.values(Reason))],
      note: faker.lorem.sentence(),
    };
    expect(
      await service.add(ownerFaceitId, addPlayerToBlacklistInput)
    ).toBe(true);
    expect(userRepositoryMock.updateOne).toHaveBeenCalledWith(
      {
        faceitId: ownerFaceitId,
        'blacklistedPlayers.faceitId': {
          $ne: addPlayerToBlacklistInput.faceitId,
        },
      },
      { $push: { blacklistedPlayers: addPlayerToBlacklistInput } }
    );
  });
});
