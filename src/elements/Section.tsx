import classNames from "classnames";

export default function Section({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={classNames(
        "flex flex-col gap-10 rounded-3xl border border-surface-300 bg-surface-100 p-10 shadow",
        className,
      )}
    />
  );
}
