import { userMock } from '../../../../schemas/__mocks__/user.schema';
export class GetUserService {
  get = jest.fn(() => userMock);
}
