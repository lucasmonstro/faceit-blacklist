import { ApolloError } from 'apollo-server-express';
export class CannotAddOwnerToYourOwnBlacklistException extends ApolloError {
  constructor() {
    super('It is not possible to add the owner to your own blacklist');
  }
}
