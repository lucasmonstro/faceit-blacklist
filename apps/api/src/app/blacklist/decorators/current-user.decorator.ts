import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
export const CurrentUser = createParamDecorator((
  data /* TODO: add parameter type */,
  context: ExecutionContext
) /* TODO: add return type */ => {
  const ctx = GqlExecutionContext.create(context);
  const user = ctx.getContext().req.user;
  const userOrAttribute = data ? user[data] : user;
  return userOrAttribute;
});
