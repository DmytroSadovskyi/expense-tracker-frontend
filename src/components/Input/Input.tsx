import { useState } from 'react';
import classNames from 'classnames';
import { BiShow, BiHide, BiCheck } from 'react-icons/bi';

import { FormInputProps } from './props.ts';
export const Input = ({
  config,
  errors,
  register,
  trigger,
  watch,
  textarea,
  className,
}: FormInputProps) => {
  const { name, validation, placeholder, label } = config;
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const value = watch(name);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = async () => {
    setIsFocused(false);
    await trigger(name);
  };
  const isError = errors?.[name];

  const isSuccess = !isError && !isFocused && value;

  const isPasswordField = config.name === 'password';

  const inputType = () => {
    switch (config.name) {
      case 'password':
        return showPassword ? 'text' : 'password';
      case 'date':
        return 'date';
      case 'amount':
        return 'number';
      default:
        return 'text';
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formFieldClasses = classNames(
    'flex flex-col mb-4 last-of-type:mb-0',
    className,
  );

  const wrapperClasses = classNames('relative', {
    // 'mb-4 last-of-type:mb-0': !isError || isFocused,
    // 'mb-1 last-of-type:mb-1': isError || !isFocused,
    // 'last-of-type:mb-4': isFocused || !isError,
  });

  const inputClasses = classNames(
    'w-full rounded-[4px] h-[48px] pb-[16px] pl-4 pt-[15px] text-[16px] leading-[1.2] text-darkGray outline-none  placeholder:text-[16px] placeholder:leading-[1.2] placeholder:text-disabled md:text-[14px] md:placeholder:text-[14px]',
    {
      'border border-error': isError && !isFocused,
      'border border-primary focus:border-primary': !isError || isFocused,
    },
  );

  return (
    <div className={formFieldClasses}>
      <label htmlFor={name} className="mb-2 cursor-pointer">
        {label}
      </label>
      {textarea ? (
        <div>
          <textarea id={name} placeholder={placeholder} {...register(name)} />
        </div>
      ) : (
        <div className={wrapperClasses}>
          <input
            className={inputClasses}
            type={inputType()}
            aria-required="true"
            aria-invalid={isError ? 'true' : 'false'}
            aria-describedby={isError ? `errorName${name}` : undefined}
            id={name}
            {...register(name, {
              ...validation,

              minLength: {
                value: validation?.minLength ? validation?.minLength.value : 0,
                message: validation?.minLength
                  ? validation?.minLength.message
                  : '',
              },
              maxLength: {
                value: validation?.maxLength ? validation?.maxLength.value : 40,
                message: validation?.maxLength
                  ? validation?.maxLength.message
                  : '',
              },
              pattern: {
                value: validation?.pattern
                  ? new RegExp(validation.pattern.value)
                  : new RegExp(''),
                message: validation?.pattern ? validation.pattern.message : '',
              },
            })}
            placeholder={placeholder}
            onBlur={handleBlur}
            onFocus={handleFocus}
          />
          {isPasswordField && (
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-1/2 -translate-y-1/2 transform cursor-pointer"
            >
              {showPassword ? (
                <BiShow className="h-6 w-6" />
              ) : (
                <BiHide className="h-6 w-6" />
              )}
            </span>
          )}
          {isSuccess && !isPasswordField && (
            <BiCheck
              className="success absolute right-4 top-1/2 h-6 w-6 -translate-y-1/2 transform"
              color="#007bff"
            />
          )}{' '}
          {isError && !isFocused && (
            <>
              <span
                id={`errorName${name}`}
                className="mb-4 right-1 text-[12px] leading-[1.2] text-error absolute top-13"
              >
                {typeof isError.message === 'string' && isError.message}
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
};
