import { userMock } from '../../../../schemas/__mocks__/user.schema';
export class UpsertPlayerOnBlacklistService {
  upsert = jest.fn(() => userMock);
}
  