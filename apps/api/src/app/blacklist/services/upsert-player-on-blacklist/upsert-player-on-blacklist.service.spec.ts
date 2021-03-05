import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';
import { User } from '../../../schemas/user.schema';
import {
  userMock,
  userRepositoryMock,
} from '../../../schemas/__mocks__/user.schema';
import { createBlacklistedPlayerInput } from '../../inputs/__mocks__/blacklisted-player.input';
import { UpsertPlayerOnBlacklistService } from './upsert-player-on-blacklist.service';
describe('UpsertPlayerOnBlacklistService', () => {
  let service: UpsertPlayerOnBlacklistService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpsertPlayerOnBlacklistService,
        {
          provide: getModelToken(User.name),
          useValue: userRepositoryMock,
        },
      ],
    }).compile();
    service = module.get<UpsertPlayerOnBlacklistService>(
      UpsertPlayerOnBlacklistService
    );
  });
  afterEach(() => jest.clearAllMocks());
  it('should insert player on blacklist', async () => {
    const faceitId = faker.random.uuid();
    const input = createBlacklistedPlayerInput();
    expect(await service.upsert(faceitId, input)).toBe(userMock);
    expect(userRepositoryMock.updateOne).toHaveBeenNthCalledWith(
      1,
      { faceitId, 'blacklistedPlayers.faceitId': input.faceitId },
      { $set: { 'blacklistedPlayers.$': input } }
    );
    expect(userRepositoryMock.updateOne).toHaveBeenNthCalledWith(
      2,
      { faceitId },
      { $addToSet: { blacklistedPlayers: input } }
    );
  });
  it('should update player on blacklist', async () => {
    const faceitId = faker.random.uuid();
    const input = createBlacklistedPlayerInput();
    jest
      .spyOn(userRepositoryMock, 'updateOne')
      .mockImplementationOnce(() => ({ nModified: 1 }));
    expect(await service.upsert(faceitId, input)).toBe(userMock);
    expect(userRepositoryMock.updateOne).toHaveBeenCalledTimes(1);
    expect(userRepositoryMock.updateOne).toHaveBeenNthCalledWith(
      1,
      { faceitId, 'blacklistedPlayers.faceitId': input.faceitId },
      { $set: { 'blacklistedPlayers.$': input } }
    );
  });
});
