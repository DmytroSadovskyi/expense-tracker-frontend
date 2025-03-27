import { Input } from '../Input';
import { useForm, SubmitHandler } from 'react-hook-form';
import loginData from '../../../data/loginForm.json';
import registerData from '../../../data/registerForm.json';
import { FormData } from '../Input/props.ts';
import { UserFormProps } from './props.ts';
import { Link } from 'react-router';

export const UserForm = ({ type }: UserFormProps) => {
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
      className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg"
      autoComplete="off"
    >
      <p className="text-2xl font-semibold text-center mb-6">
        {type === 'register' ? 'Реєстрація' : 'Вхід'}
      </p>
      {inputs.map(input => (
        <Input
          textarea={input.name.textarea}
          key={input.name.label}
          watch={watch}
          register={register}
          trigger={trigger}
          config={input.name}
          isValid={isValid}
          isDirty={isDirty}
          errors={errors}
        />
      ))}
      <button
        type="submit"
        className="w-full bg-primary text-white py-3 rounded-lg mt-8 hover:bg-blue-600 focus:bg-blue-600 transition-colors cursor-pointer  mb-6"
      >
        {data.buttonText}
      </button>
      <div className="w-full flex items-center justify-center gap-2">
        <p className="text-[12px] md:text-[16px]">
          {type === 'login' ? 'Ще не маєте акаунта?' : 'Вже маєте акаунт?'}
        </p>
        <Link
          to={type === 'login' ? '/register' : '/login'}
          className="text-primary underline hover:text-blue-600 transition-colors text-[12px] md:text-[16px]"
        >
          {type === 'login' ? 'Зарєструватися' : 'Увійти'}
        </Link>
      </div>
    </form>
  );
};
