import * as faker from 'faker';
export const faceitIDToken = {
  picture: faker.image.avatar(),
  email: faker.internet.email(),
  birthdate: faker.date.past().toDateString(),
  nickname: faker.internet.userName(),
  guid: faker.random.uuid(),
  locale: faker.random.locale(),
  given_name: faker.name.firstName(),
  family_name: faker.name.lastName(),
  email_verified: faker.random.boolean(),
  iss: 'iss',
  aud: 'aud',
};
export const faceitJWT = {
  access_token: 'access_token',
  token_type: 'bearer',
  expires_in: faker.date.future().getMilliseconds(),
  scope: 'scope',
  id_token: 'id_token',
};