import { ActionState,FieldErrors } from "@/lib/create-safe-action";
import { useState, useCallback } from "react";

type Action<Tinput, Toutput> = (
  data: Tinput
) => Promise<ActionState<Tinput, Toutput>>;

interface useActionOptions<Toutput> {
  onSuccess?: (data: Toutput) => void;
  onError?: (error: string) => void;
  onCompleted?: () => void;
}
export const useActions = <Tinput, Toutput>(
  actions: Action<Tinput, Toutput>,
  options: useActionOptions<Toutput> = {}
) => {
  const [fieldErrors, setfieldErrors] = useState<
    FieldErrors<Tinput> | undefined
  >(undefined);
  const [error, seterror] = useState<string | undefined>(undefined);
  const [data, setdata] = useState<Toutput | undefined>(undefined);
  const [isLoading, setisLoading] = useState<boolean>(false);

  const execute = useCallback(
    async (input: Tinput) => {
      setisLoading(true);
      try {
        const result = await actions(input);
        if (!result) {
          return;
        }
        setfieldErrors(result.fieldErrors);

        if (result.error) {
          seterror(result.error);
          options.onError?.(result.error);
        }
        if (result.data) {
          setdata(result.data);
          options.onSuccess?.(result.data);
        }
      } finally {
        setisLoading(false);
        options.onCompleted?.();
      }
    },
    [actions, options]
  );

  return {
    execute,
    fieldErrors,
    error,
    data,
    isLoading,
  };
};
