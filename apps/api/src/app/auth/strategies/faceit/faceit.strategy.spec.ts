import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing'
import * as jsonwebtoken from 'jsonwebtoken';
import { userMock } from '../../../schemas/__mocks__/user.schema';
import { faceitIDToken, faceitJWT } from '../../__mocks__/faceit';
import { SignUpService } from '../../services/sign-up/sign-up.service';
import { FaceitStrategy } from './faceit.strategy';
jest.mock('../../services/sign-up/sign-up.service');
describe('FaceitStrategy', () => {
  let service: SignUpService;
  let strategy: FaceitStrategy;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [FaceitStrategy, SignUpService],
    }).compile();
    service = module.get<SignUpService>(SignUpService);
    strategy = module.get<FaceitStrategy>(FaceitStrategy);
  });
  afterEach(() => jest.clearAllMocks());
  it('should call done within error when signUp fails', async () => {
    const doneSpy = jest.fn();
    jest.spyOn(service, 'signUp').mockImplementationOnce(() => {
      throw 'Custom error';
    })
    await strategy.callback(faceitJWT, doneSpy);
    expect(jsonwebtoken.decode).toHaveBeenCalledWith(faceitJWT.id_token);
    expect(doneSpy).toHaveBeenCalledWith('Custom error');
  });
  it('should call done within correct user', async () => {
    const doneSpy = jest.fn();
    await strategy.callback(faceitJWT, doneSpy);
    expect(service.signUp).toHaveBeenCalledWith(faceitIDToken.guid);
    expect(doneSpy).toHaveBeenCalledWith(null, userMock);
  });
});