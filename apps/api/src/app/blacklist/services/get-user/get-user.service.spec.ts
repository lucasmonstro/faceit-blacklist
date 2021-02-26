import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';
import { User } from '../../../schemas/user.schema';
import { userMock, userRepositoryMock } from '../../../schemas/__mocks__/user.schema';
import { GetUserService } from './get-user.service';
describe('GetUserService', () => {
  let service: GetUserService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUserService,
        {
          provide: getModelToken(User.name),
          useValue: userRepositoryMock,
        },
      ],
    }).compile();
    service = module.get<GetUserService>(GetUserService);
  });
  it('should get player blacklist by ownerFaceitId', async () => {
    const faceitId = faker.random.uuid();
    expect(await service.get(faceitId)).toBe(userMock);
    expect(userRepositoryMock.findOne).toHaveBeenCalledWith({ faceitId });
  });
});
