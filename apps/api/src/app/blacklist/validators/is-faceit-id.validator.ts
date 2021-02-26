import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  registerDecorator,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationOptions,
} from 'class-validator';
// TODO: add unit tests
@Injectable()
@ValidatorConstraint({ name: 'isFaceitId' })
export class IsFaceitIdValidator implements ValidatorConstraintInterface {
  constructor(
    private configService: ConfigService,
    private httpService: HttpService
  ) {}
  async validate(faceitId: string): Promise<boolean> {
    try {
      const apiKey = this.configService.get('FACEIT_API_KEY');
      await this.httpService
        .get(`https://open.faceit.com/data/v4/players/${faceitId}`, {
          headers: { authorization: `Bearer ${apiKey}` },
        })
        .toPromise();
    } catch (err) {
      // TODO: log err
      return false;
    }
    return true;
  }
}
export const IsFaceitId = (options?: ValidationOptions) => (
  object, // TODO: add parameter type
  propertyName: string
) =>
  registerDecorator({
    options,
    propertyName,
    target: object.constructor,
    validator: IsFaceitIdValidator,
  });
