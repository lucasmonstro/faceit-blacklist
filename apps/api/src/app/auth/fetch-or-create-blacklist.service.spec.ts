import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing'
import { Model } from 'mongoose';
import { Blacklist, BlacklistDocument } from '../schemas/blacklist.schema';
import { blacklistMock } from '../schemas/__mocks__/blacklist.schema';
import { FetchOrCreateBlacklistService } from './fetch-or-create-blacklist.service';
describe('FetchOrCreateBlacklistService', () => {
  let service: FetchOrCreateBlacklistService;
  let model: Model<BlacklistDocument>;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        FetchOrCreateBlacklistService,
        {
          provide: getModelToken(Blacklist.name),
          useValue: { create: jest.fn(), findOne: jest.fn() },
        }
      ],
    }).compile();
    service = module.get<FetchOrCreateBlacklistService>(FetchOrCreateBlacklistService);
    model = module.get(getModelToken(Blacklist.name));
  });
  afterEach(() => jest.clearAllMocks());
  it('should find and return a blacklist', async () => {
    jest.spyOn(model, 'findOne').mockReturnValueOnce(blacklistMock);
    expect(await service.fetchOrCreate(blacklistMock.faceitId)).toBe(blacklistMock);
    expect(model.findOne).toHaveBeenCalledWith({ faceitId: blacklistMock.faceitId });
  });
  it('should create a new blacklist when it doesnt exist', async () => {
    jest.spyOn(model, 'findOne').mockReturnValueOnce(null);
    jest.spyOn(model, 'create').mockResolvedValueOnce(blacklistMock);
    expect(await service.fetchOrCreate(blacklistMock.faceitId)).toMatchObject(blacklistMock);
    expect(model.findOne).toHaveBeenCalledWith({ faceitId: blacklistMock.faceitId });
    expect(model.create).toHaveBeenCalledWith({ faceitId: blacklistMock.faceitId });
  });
});