import { useId, forwardRef } from "react";

const TextInput = forwardRef<
  HTMLInputElement,
  React.HTMLProps<HTMLInputElement> & {
    label?: string;
  }
>(function TextInput({ label, children, ...rest }, ref) {
  const id = useId();

  return (
    <div className="flex w-full flex-col">
      {label && (
        <label className="mb-3 text-surface-500" htmlFor={id}>
          {label}
        </label>
      )}
      <div className="relative w-full">
        <input
          ref={ref}
          {...rest}
          id={id}
          className="h-12 w-full rounded-xl border border-surface-400 bg-surface-100 p-4 placeholder-surface-400"
        />
        {children}
      </div>
    </div>
  );
});

export default TextInput;
