import { Reason } from '@faceit-blacklist/interfaces';
import * as faker from 'faker';
import { AddPlayerToBlacklistInput } from '../add-player-to-blacklist.input';
export const createAddPlayerToBlacklistInput = (input?: Partial<AddPlayerToBlacklistInput>):
  AddPlayerToBlacklistInput => Object.assign(
    {
      faceitId: faker.random.uuid(),
      reason: [faker.random.arrayElement(Object.values(Reason))],
      note: faker.lorem.sentence(),
    },
    input
  );