import { useState } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';
import { uk } from 'date-fns/locale/uk';
import DatePicker, { registerLocale } from 'react-datepicker';
import { Input } from '../Input';
import 'react-datepicker/dist/react-datepicker.css';
import data from '../../../data/addTransactionForm.json';
import { FormData } from '../Input/props.ts';

export const AddTransactionForm = () => {
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

  const [date, setDate] = useState<Date | null>(new Date());

  registerLocale('uk', uk);

  const onSubmit: SubmitHandler<FormData> = data => {
    const dataToSend = {
      ...data,
      date: date,
      amount: Number(data.amount),
    };
    console.log(dataToSend);
    reset();
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full"
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
      <p className="mb-2">Дата</p>
      <DatePicker
        onChange={date => setDate(date)}
        selected={date}
        showMonthYearDropdown={true}
        locale={uk}
        showTimeSelect={true}
        timeIntervals={1}
        minDate={new Date(2025, 0, 1)}
        maxDate={new Date(2030, 11, 31)}
        dateFormat="dd/MM/yyyy"
        timeCaption="Час"
        popperPlacement="bottom-start"
        className="w-full border border-primary rounded-[4px] h-[48px] pb-[16px] pl-4 pt-[15px] text-[16px] leading-[1.2] text-darkGray outline-none  placeholder:text-[16px] placeholder:leading-[1.2] placeholder:text-disabled md:text-[14px] md:placeholder:text-[14px]"
      />
      <button
        type="submit"
        className="w-full bg-primary text-white py-3 rounded-lg mt-8 hover:bg-blue-600 transition-colors cursor-pointer  mb-6 focus:bg-blue-600"
      >
        {data.buttonText}
      </button>
    </form>
  );
};
