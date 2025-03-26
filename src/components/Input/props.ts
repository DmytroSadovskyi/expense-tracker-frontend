import {UseFormRegister, FieldErrors} from 'react-hook-form'

export type FormData = {
    [key: string]: any;
};

export type FormInputsConfig = {
    name: string;
    label: string;
    placeholder?: string;
    validation?: validationInput;
};

export type validationInput = {
    required?: validationRequired;
    pattern?: validationPattern;
    minLength?: validationLength;
    maxLength?: validationLength;
};

export type validationRequired = {
    value: boolean;
    message: string;
};

export type validationPattern = {
    value: string;
    message: string;
};

export type validationLength = {
    value: number;
    message: string;
};

export type ValidationRule = {
    required?: boolean | { value: boolean; message: string };
    pattern?: { value: RegExp; message: string };
    minLength?: { value: number; message: string };
    maxLength?: { value: number; message: string };
    validate?: (value: string) => boolean | string;
};

export type FormInputProps = {
    config: FormInputsConfig;
    textarea: boolean;
    register: UseFormRegister<FormData>;
    errors?: FieldErrors<FormData>;
    watch: (name: string) => string;
    trigger: (name?: string | string[]) => Promise<boolean>;
    isDirty?: boolean;
    isValid?: boolean;
    formType?: '' | '' | '';
    className?: string;
};