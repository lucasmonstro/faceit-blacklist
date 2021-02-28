import { Reason } from '@faceit-blacklist/interfaces';
import * as faker from 'faker';
import { BlacklistedPlayerInput } from '../blacklisted-player.input';
export const createBlacklistedPlayerInput = (input?: Partial<BlacklistedPlayerInput>):
  BlacklistedPlayerInput => Object.assign(
    {
      faceitId: faker.random.uuid(),
      reason: [faker.random.arrayElement(Object.values(Reason))],
      note: faker.lorem.sentence(),
    },
    input
  );