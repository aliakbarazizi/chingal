import classNames from "classnames";
import { NavLink } from "react-router-dom";

export default function MenuItem({
  title,
  to,
  icon,
}: {
  title: string;
  to: string;
  icon: JSX.Element;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        classNames(
          isActive
            ? "border-surface-300 text-primary-500"
            : "border-transparent text-surface-500",
          "flex cursor-pointer rounded-[20px] border px-4 py-5 space-s-3",
        )
      }
      style={({ isActive }) => ({
        background: isActive
          ? "linear-gradient(201deg, rgba(2, 11, 31, 0.50) 0%, rgba(24, 32, 64, 0.50) 86.08%)"
          : undefined,
      })}
    >
      {icon}
      <span>{title}</span>
    </NavLink>
  );
}
