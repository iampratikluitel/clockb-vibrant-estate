import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import dynamic from "next/dynamic";
import { Label } from "@/components/ui/label";
import { FormMessage } from "@/components/ui/form";

const TipTapEditor = dynamic(() => import("./CustomEditor"), {
    ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded-md" />,
});

const ReactTipTapEditor = ({
  name,
  label,
}: {
  name: string;
  label?: string | undefined | null;
}) => {
  const {
    control,
    setValue,
    watch,
    formState: { isSubmitSuccessful },
  } = useFormContext();

  const values = watch();

  React.useEffect(() => {
    if (values[name] === "<p></p>" || values[name] === "<p><br></p>") {
      setValue(name, "", {
        shouldValidate: !isSubmitSuccessful,
      });
    }
  }, [isSubmitSuccessful, name, setValue, values]);

  const handleUpdate = (html: string) => {
    // Additional handling if needed
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {label && <Label className="text-sm font-medium">{label}</Label>}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className="flex flex-col gap-2 w-full">
            <div className="w-full relative">
              <TipTapEditor
                name={name}
                placeholder="Start writing..."
                characterLimit={10000}
                onUpdate={handleUpdate}
                className="w-full rounded-md border border-input bg-background"
              />
            </div>
            {error && (
              <FormMessage className="text-sm text-destructive">
                {error?.message}
              </FormMessage>
            )}
          </div>
        )}
      />
    </div>
  );
};

// Add custom styles to handle TipTap responsiveness
const styles = `
  @media (max-width: 640px) {
    .ProseMirror {
      min-height: 150px;
    }
    
    .tiptap-toolbar {
      flex-wrap: wrap;
      padding: 8px;
    }
    
    .tiptap-toolbar button {
      width: 28px;
      height: 28px;
    }
  }

  @media (min-width: 641px) and (max-width: 1024px) {
    .ProseMirror {
      min-height: 200px;
    }
  }

  @media (min-width: 1025px) {
    .ProseMirror {
      min-height: 250px;
    }
  }
`;

// Add styles to document head
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

export default ReactTipTapEditor;