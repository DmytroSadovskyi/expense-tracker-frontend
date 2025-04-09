import { SearchbarProps } from './props.ts';
import { useEffect, useState, ChangeEvent } from 'react';
import { FaSearch } from 'react-icons/fa';
import classNames from 'classnames';

export const Searchbar = ({
  value: initialValue,
  onChange,
}: SearchbarProps) => {
  const [value, setValue] = useState(initialValue);
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    onChange(value);
  }, [onChange, value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const inputClasses = classNames(
    'w-full pb-[16px] pt-[15px] border border-primary rounded-[4px] h-10   text-[16px] leading-[1.2] text-darkGray outline-none  placeholder:text-[16px] placeholder:leading-[1.2] placeholder:text-disabled md:text-[14px] md:placeholder:text-[14px]',
    { 'pl-12': !focused, 'pl-4': focused },
  );

  const iconClasses = classNames(
    'text-gray-500 cursor-pointer absolute top-1/2 left-4 -translate-y-1/2 transform',
    {
      hidden: focused,
      'inline-block': !focused,
    },
  );

  return (
    <div className="relative w-[200px] mb-6 ">
      <FaSearch className={iconClasses} />
      <input
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        value={value}
        onChange={handleChange}
        className={inputClasses}
      />
    </div>
  );
};
