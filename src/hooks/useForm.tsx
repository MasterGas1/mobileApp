import {useCallback, useState} from 'react';

export const useForm = <T extends Object>(
  initState: T,
  validations?: {
    [key in keyof T]?: {
      errorMessage: string;
      regexValidation: RegExp;
    };
  },
  onSubmit?: (form: T) => void,
) => {
  const [state, setState] = useState(initState);
  const [errors, setErrors] = useState<Record<keyof T, string | undefined>>(
    {} as Record<keyof T, string | undefined>,
  );
  const [touched, setTouched] = useState<Record<keyof T, boolean>>(
    {} as Record<keyof T, boolean>,
  );

  const onChange = useCallback(
    (value: string | number | boolean, field: keyof T) => {
      let error: string | null = null;
      const newValue = value.toString();

      if (validations?.[field]) {
        const {regexValidation, errorMessage} = validations[field]!;

        if (!regexValidation.test(newValue)) {
          error = errorMessage;
        } else {
          error = null;
        }
      }
      setState({
        ...state,
        [field]: value,
      });

      setErrors({
        ...errors,
        [field]: error,
      });
    },
    [validations, state],
  );

  const handleSubmit = () => {
    const stateKeys = Object.keys(state) as Array<keyof T>;

    const touchedAll = {...touched};

    stateKeys.forEach(key => {
      touchedAll[key] = true;
    });

    setTouched(touchedAll);

    const errors = validateValues(stateKeys);

    if (onSubmit && Object.keys(errors).length === 0) {
      onSubmit(state);
    }
  };

  const validateValues = (keys: Array<keyof T>) => {
    const errors: Record<keyof T, string> = {} as Record<keyof T, string>;

    keys.forEach(key => {
      if (typeof state[key] === 'string' && validations?.[key]) {
        const {regexValidation, errorMessage} = validations[key]!;

        if (!regexValidation.test(state[key])) {
          errors[key] = errorMessage;
        }
      }
    });

    setErrors(errors);

    return errors;
  };

  const updateValues = (values: Partial<T>) => {
    setState({
      ...state,
      ...values,
    });
  };

  const resetForm = () => {
    setState(initState);
    setErrors({} as Record<keyof T, string | undefined>);
    setTouched({} as Record<keyof T, boolean>);
  };

  return {
    ...state,
    errors,
    values: state,
    touched,
    onChange,
    handleSubmit,
    resetForm,
    updateValues,
  };
};
