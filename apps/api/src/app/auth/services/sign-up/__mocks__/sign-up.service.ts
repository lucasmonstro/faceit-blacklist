import { userMock } from '../../../../schemas/__mocks__/user.schema';
export class SignUpService {
  signUp = jest.fn(() => userMock);
}
