import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const ReqUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  console.log(request.headers);
  const user = request.user;
  if (!user) {
    throw new UnauthorizedException();
  }
  return user;
});
