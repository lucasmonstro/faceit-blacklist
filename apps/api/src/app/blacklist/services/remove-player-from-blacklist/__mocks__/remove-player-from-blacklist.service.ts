import { userMock } from '../../../../schemas/__mocks__/user.schema';
export class RemovePlayerFromBlacklistService {
  remove = jest.fn(() => userMock);
}
