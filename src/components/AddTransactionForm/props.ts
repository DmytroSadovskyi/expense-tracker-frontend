import { FormData } from '../Input/props.ts';
export interface AddTransactionFormProps {
  onClose: () => void;
  isEditForm: boolean;
  transaction?: FormData | null;
}
