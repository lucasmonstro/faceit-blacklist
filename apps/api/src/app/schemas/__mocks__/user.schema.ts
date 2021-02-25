import * as faker from 'faker';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const userMock = { faceitId: faker.random.uuid(), blacklistedPlayers: [] } as any;
export const userRepositoryMock = { findOneAndUpdate: jest.fn(() => userMock) };