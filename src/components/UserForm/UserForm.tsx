import { Input } from '../Input';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router';

import { useAppDispatch } from '../../../redux/store';
import { useTypedSelector } from '../../../redux/store';
import {
  logIn,
  register as registerUser,
} from '../../../redux/auth/operations';

import loginData from '../../../data/loginForm.json';
import registerData from '../../../data/registerForm.json';
import { FormData } from '../Input/props';
import { UserFormProps } from './props';

export const UserForm = ({ type }: UserFormProps) => {
  const data = type === 'register' ? registerData : loginData;
  const {
    reset,
    register,
    watch,
    trigger,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
  });
  const { inputs } = data;
  const dispatch = useAppDispatch();
  const loading = useTypedSelector(state => state.auth.loading);

  const onSubmit: SubmitHandler<FormData> = data => {
    console.log(data);
    if (type === 'register') {
      dispatch(registerUser(data));
    } else {
      dispatch(logIn(data));
    }
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg"
      autoComplete="off"
    >
      <p className="text-2xl font-semibold text-center mb-6">
        {type === 'register' ? registerData.title : loginData.title}
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
        className="w-full bg-primary text-white py-3 rounded-lg mt-8 hover:bg-blue-600 focus:bg-blue-600 hover:-translate-y-1 transition-all duration-300 cursor-pointer  mb-6"
      >
        {loading === 'pending' ? 'Зачекайте...' : data.buttonText}
      </button>
      <div className="w-full flex items-center justify-center gap-2">
        <p className="text-[12px] md:text-[16px]">
          {type === 'login'
            ? loginData.questionText
            : registerData.questionText}
        </p>
        <Link
          to={type === 'login' ? '/register' : '/login'}
          className="text-primary underline hover:text-blue-600 transition-colors text-[12px] md:text-[16px]"
        >
          {type === 'login' ? registerData.buttonText : loginData.buttonText}
        </Link>
      </div>
    </form>
  );
};
