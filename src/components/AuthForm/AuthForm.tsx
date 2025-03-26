import { Input } from '../Input';
import { useForm, SubmitHandler } from 'react-hook-form';
import loginData from '../../../data/loginForm.json';
import registerData from '../../../data/registerForm.json';
import { FormData } from '../Input/props.ts';
import { AuthFormProps } from './props.ts';

export const AuthForm = ({ type }: AuthFormProps) => {
  const data = type === 'register' ? registerData : loginData;
  const {
    register,
    watch,
    trigger,
    reset,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
  });
  const { inputs } = data;

  const onSubmit: SubmitHandler<FormData> = data => {
    console.log(data);
    reset();
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[500px] p-[20px]"
      autoComplete="off"
    >
      {inputs.map(input => (
        <Input
          key={input.name.label}
          watch={watch}
          register={register}
          trigger={trigger}
          textarea={input.name.textarea}
          config={input.name}
          isValid={isValid}
          isDirty={isDirty}
          errors={errors}
        />
      ))}
      <button
        type="submit"
        className="block mx-auto cursor-pointer text-white bg-primary p-2.5 rounded-[16px] mt-8"
      >
        {data.buttonText}
      </button>
    </form>
  );
};
