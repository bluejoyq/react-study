import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

export const useSavedState = <T>(
  key: string,
  defaultValue: T,
): [T, Dispatch<SetStateAction<T>>] => {
  const _saveState = useCallback(
    (value: T) => {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [key],
  );
  const [state, setState] = useState<T>(() => {
    const savedState = localStorage.getItem(key);
    if (savedState) {
      return JSON.parse(savedState);
    }
    return defaultValue;
  });

  const setSavedState = (stateAction: SetStateAction<T>) => {
    setState((prevState) => {
      const newState =
        typeof stateAction === "function"
          ? (stateAction as (prevState: T) => T)(prevState)
          : stateAction;
      _saveState(newState);
      return newState;
    });
  };

  useEffect(() => {
    _saveState(state);
  }, [state, _saveState]);
  return [state, setSavedState];
};
