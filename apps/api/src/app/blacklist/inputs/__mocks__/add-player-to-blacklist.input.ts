import { Reason } from '@faceit-blacklist/interfaces';
import * as faker from 'faker';
import { AddPlayerToBlacklistInput } from '../add-player-to-blacklist.input';
export const createAddPlayerToBlacklistInput = (input: Partial<AddPlayerToBlacklistInput> = {}): AddPlayerToBlacklistInput => ({
  faceitId: input.faceitId || faker.random.uuid(),
  reason: input.reason || [faker.random.arrayElement(Object.values(Reason))],
  note: input.note || faker.lorem.sentence(),
});