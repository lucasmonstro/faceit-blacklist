import { FaceitIDToken } from '@faceit-blacklist/interfaces';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
// TODO: add return type
export const CurrentUser = createParamDecorator((
  prop: keyof FaceitIDToken,
  context: ExecutionContext
) => {
  const ctx = GqlExecutionContext.create(context);
  const user = ctx.getContext().req.user;
  const userOrAttribute = prop ? user[prop] : user;
  return userOrAttribute;
});
