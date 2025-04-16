import { useState, useEffect } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';
import { uk } from 'date-fns/locale/uk';
import DatePicker, { registerLocale } from 'react-datepicker';
// import classNames from 'classnames';
import { useAppDispatch, useTypedSelector } from '../../../redux/store';

import {
  addTransaction,
  updateTransaction,
} from '../../../redux/transactions/operations';
import { Input } from '../Input';

import 'react-datepicker/dist/react-datepicker.css';
import incomeFormData from '../../../data/addIncomeForm.json';
import expenseFormData from '../../../data/addExpenseForm.json';
import commonData from '../../../data/common.json';
import { FormData } from '../Input/props.ts';
import { AddTransactionFormProps } from './props.ts';

export const AddTransactionForm = ({
  onClose,
  isEditForm,
  transaction,
}: AddTransactionFormProps) => {
  const [transactionType, setTransactionType] = useState<'витрата' | 'дохід'>(
    'дохід',
  );
  const [date, setDate] = useState<Date | null>(new Date());

  const data = transactionType === 'витрата' ? expenseFormData : incomeFormData;
  const { saveButtonText, expenseButtonText, incomeButtonText } = commonData;
  const dispatch = useAppDispatch();
  const loading = useTypedSelector(state => state.transactions.isLoading);

  const {
    register,
    watch,
    trigger,
    reset,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: transaction
      ? {
          _id: transaction._id,
          category: transaction.category,
          description: transaction.description,
          amount: transaction.amount,
          date: transaction.date,
        }
      : {},
  });

  useEffect(() => {
    if (transaction && transaction.type === 'витрата') {
      setTransactionType('витрата');
    } else {
      setTransactionType('дохід');
    }
  }, [transaction]);

  useEffect(() => {
    if (transaction) {
      setDate(new Date(transaction.date));
    } else {
      setDate(new Date());
    }
  }, [transaction]);

  useEffect(() => {
    if (transaction) {
      reset({
        id: transaction.id,
        category: transaction.category,
        description: transaction.description,
        amount: transaction.amount,
        date: transaction.date,
      });
    } else {
      reset();
    }
  }, [transaction, reset]);

  const { inputs } = data;

  registerLocale('uk', uk);

  const setExpense = () => {
    setTransactionType('витрата');
  };

  const setIncome = () => {
    setTransactionType('дохід');
  };

  const incomeButtonClass =
    transactionType === 'дохід'
      ? 'bg-primary text-white py-3 rounded-lg px-4  hover:bg-blue-600 transition-colors cursor-pointer focus:bg-blue-600 w-1/2'
      : 'border border-primary text-black py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer focus:bg-blue-600 hover:text-white focus:text-white w-1/2';
  const expenseButtonClass =
    transactionType === 'витрата'
      ? 'bg-primary text-white py-3 rounded-lg px-4  hover:bg-blue-600 transition-colors cursor-pointer focus:bg-blue-600 w-1/2'
      : 'border border-primary text-black py-3 px-4 rounded-lg hover:bg-blue-600 hover:text-white focus:text-white transition-colors cursor-pointer focus:bg-blue-600 w-1/2';

  console.log(transaction);

  const onSubmit: SubmitHandler<FormData> = data => {
    const dataToSend = {
      ...data,
      type: transactionType,
      date: String(date),
      amount: Number(data.amount),
    };
    console.log('dataToSend:', dataToSend);

    if (isEditForm) {
      dispatch(
        updateTransaction({
          _id: transaction?._id,
          transaction: {
            type: data.type,
            category: data.category,
            description: data.description,
            date: String(date),
            amount: Number(data.amount),
            _id: data._id,
          },
        }),
      );
    } else {
      dispatch(addTransaction(dataToSend));
    }

    reset();
    onClose();
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full"
      autoComplete="off"
    >
      <p className="mb-2">Тип транзакції</p>
      <div className="flex gap-2 mb-6">
        <button
          type="button"
          className={incomeButtonClass}
          onClick={setIncome}
          disabled={isEditForm && transaction?.type === 'витрата'}
        >
          {incomeButtonText}
        </button>
        <button
          type="button"
          className={expenseButtonClass}
          onClick={setExpense}
          disabled={isEditForm && transaction?.type === 'дохід'}
        >
          {expenseButtonText}
        </button>
      </div>
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
      <label htmlFor="date-picker" className="mb-2 block cursor-pointer">
        {data.dateLabelText}
      </label>
      <DatePicker
        id="date-picker"
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
        className="pb-[16px] pl-4 pt-[15px] border border-primary rounded-[4px] h-[48px]  text-[16px] leading-[1.2] text-darkGray outline-none  placeholder:text-[16px] placeholder:leading-[1.2] placeholder:text-disabled md:text-[14px] md:placeholder:text-[14px]"
      />
      <button
        type="submit"
        className="w-full bg-primary text-white py-3 rounded-lg mt-8 hover:bg-blue-600 hover:-translate-y-1 transition-all duration-300 cursor-pointer  mb-6 focus:bg-blue-600"
      >
        {loading
          ? 'Зачекайте...'
          : isEditForm
            ? saveButtonText
            : data.buttonText}
      </button>
    </form>
  );
};
