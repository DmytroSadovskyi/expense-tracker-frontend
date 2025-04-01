import { useEffect, useRef } from 'react';
import { IoMdClose } from 'react-icons/io';
import classNames from 'classnames';
import { AddTransactionForm } from '../AddTransactionForm';

import { ModalProps } from './props.ts';

export const Modal = ({ onClose, isOpen }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current?.contains(e.target as Element))
        onClose();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleMouseDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [isOpen, onClose]);

  const backdropClasses = classNames(
    'fixed h-full w-full top-0 left-0 rgb(255,0,0)]/50 transition-opacity backdrop-blur-[3px]',
    {
      'opacity-100 visible': isOpen,
      'opacity-0 invisible': !isOpen,
    },
  );

  const modalClasses = classNames(
    'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl p-10 w-[90%] max-h-[90%]  overflow-x-hidden overflow-y-scroll max-w-[600px] transition-all duration-300',
    {
      'scale-100 opacity-100': isOpen,
      'scale-90 opacity-0': !isOpen,
    },
  );

  return (
    <>
      <div className={backdropClasses}>
        <div ref={modalRef} className={modalClasses}>
          <button
            onClick={onClose}
            className="absolute right-6 top-6 text-primary hover:text-blue-600 focus:text-blue-600  hover:rotate-180 transition-all"
          >
            <IoMdClose className="h-6 w-6 cursor-pointer " />
          </button>
          <AddTransactionForm onClose={onClose} />
        </div>
      </div>
    </>
  );
};
