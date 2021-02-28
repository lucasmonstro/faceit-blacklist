import * as faker from 'faker';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const userMock = { faceitId: faker.random.uuid(), blacklistedPlayers: [] } as any;
export const userRepositoryMock = {
  findOne: jest.fn(() => userMock),
  findOneAndUpdate: jest.fn(() => userMock),
  updateOne: jest.fn(() => ({ nModified: 0 })),
};