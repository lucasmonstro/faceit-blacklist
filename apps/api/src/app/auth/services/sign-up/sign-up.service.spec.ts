import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Model } from 'mongoose';
import { User, UserDoc } from '../../../schemas/user.schema';
import { userMock } from '../../../schemas/__mocks__/user.schema';
import { SignUpService } from './sign-up.service';
describe('SignUpService', () => {
  let service: SignUpService;
  let model: Model<UserDoc>;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        SignUpService,
        {
          provide: getModelToken(User.name),
          useValue: { create: jest.fn(), findOne: jest.fn() },
        },
      ],
    }).compile();
    service = module.get<SignUpService>(SignUpService);
    model = module.get(getModelToken(User.name));
  });
  afterEach(() => jest.clearAllMocks());
  it('should find and return an user', async () => {
    jest.spyOn(model, 'findOne').mockReturnValueOnce(userMock);
    expect(await service.signUp(userMock.faceitId)).toBe(userMock);
    expect(model.findOne).toHaveBeenCalledWith({ faceitId: userMock.faceitId });
  });
  it('should create a new user when it doesnt exist', async () => {
    jest.spyOn(model, 'findOne').mockReturnValueOnce(null);
    jest.spyOn(model, 'create').mockResolvedValueOnce(userMock);
    expect(await service.signUp(userMock.faceitId)).toMatchObject(userMock);
    expect(model.findOne).toHaveBeenCalledWith({ faceitId: userMock.faceitId });
    expect(model.create).toHaveBeenCalledWith({ faceitId: userMock.faceitId });
  });
});
