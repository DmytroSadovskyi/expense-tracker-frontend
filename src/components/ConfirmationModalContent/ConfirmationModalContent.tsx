import { Props } from './props.ts';

export const ConfirmationModalContent = ({
  onConfirmClick,
  onCancelClick,
}: Props) => {
  return (
    <div>
      <p className="mb-2">Ви впевнені?</p>
      <div className="flex items-center gap-2">
        <button
          onClick={onConfirmClick}
          className="w-1/2  bg-primary text-white py-3 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer  focus:bg-blue-600"
        >
          Так
        </button>
        <button
          onClick={onCancelClick}
          className="w-1/2 bg-error text-white py-3 rounded-lg hover:bg-red-600 transition-colors cursor-pointer  focus:bg-red-600"
        >
          Ні
        </button>
      </div>
    </div>
  );
};
