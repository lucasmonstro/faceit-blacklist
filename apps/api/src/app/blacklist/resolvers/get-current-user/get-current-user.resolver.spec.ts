import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';
import { userMock } from '../../../schemas/__mocks__/user.schema';
import { GetCurrentUserResolver } from '../../resolvers/get-current-user/get-current-user.resolver';
import { GetUserService } from '../../services/get-user/get-user.service';
jest.mock('../../services/get-user/get-user.service');
describe('GetCurrentUserResolver', () => {
  let resolver: GetCurrentUserResolver;
  let service: GetUserService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetUserService, GetCurrentUserResolver],
    }).compile();
    resolver = module.get<GetCurrentUserResolver>(GetCurrentUserResolver);
    service = module.get<GetUserService>(GetUserService);
  });
  it('should get current user', async () => {
    const ownerFaceitId = faker.random.uuid();
    expect(await resolver.getCurrentUser(ownerFaceitId)).toBe(userMock);
    expect(service.get).toHaveBeenCalledWith(ownerFaceitId);
  });
});
