import classNames from "classnames";

export default function Button({
  className,
  shadow,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { shadow?: boolean }) {
  return (
    <button
      className={classNames(
        className,
        props.disabled
          ? "bg-primary-200 text-primary-300"
          : "bg-primary-500 text-white hover:bg-primary-600 ",
        shadow &&
          (props.disabled ? "shadow-[rgba(3,54,153,0.24)]" : "shadow-button"),
        "h-14 rounded-2xl px-6 py-4 text-xl",
      )}
      {...props}
    ></button>
  );
}
