import classNames from "classnames";

const variants = {
  primary: {
    default:
      "bg-primary-500 text-white hover:bg-primary-600 border-transparent",
    disabled: "bg-primary-200 text-primary-300",
  },
  danger: {
    default: "bg-red-500 text-white hover:bg-red-600 border-transparent",
    disabled: "bg-red-200 text-red-300",
  },
  "outline-primary": {
    default: "text-primary-500 border-primary-500 hover:bg-white",
    disabled: "bg-primary-200 text-primary-300",
  },
};

export default function Button({
  className,
  shadow,
  variant,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  shadow?: boolean;
  variant: keyof typeof variants;
}) {
  return (
    <button
      className={classNames(
        className,
        props.disabled ? variants[variant].disabled : variants[variant].default,
        shadow &&
          (props.disabled ? "shadow-[rgba(3,54,153,0.24)]" : "shadow-button"),
        "h-14 rounded-2xl border px-6 py-4 text-xl",
      )}
      {...props}
    ></button>
  );
}
