import { registerDecorator, ValidationOptions, Validator } from 'class-validator';

const validator = new Validator();

export const IsValidName = (validationOptions?: ValidationOptions) =>
    (object: object, propertyName: string) => {
        registerDecorator({
            name: 'IsValidName',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate(value: any) {
                    return (
                        validator.isNotEmpty(value)
                        && validator.isAlpha(value)
                        && validator.isUppercase(value.slice(0, 1))
                        && validator.isLowercase(value.slice(1))
                    );
                },
            },
        });
    };
