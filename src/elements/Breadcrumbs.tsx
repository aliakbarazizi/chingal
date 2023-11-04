import { UIMatch, useMatches } from "react-router-dom";
import ArrowLeft1 from "../assets/icons/outline/ArrowLeft1";
import classNames from "classnames";

export default function Breadcrumbs() {
  const matches = useMatches() as UIMatch<
    unknown,
    { breadcrumb: () => string }
  >[];

  const crumbs = matches
    .filter((match) => Boolean(match.handle?.breadcrumb))
    // now map them into an array of elements, passing the loader
    // data to each one
    .map((match) => match.handle.breadcrumb());

  return (
    <div className="flex gap-1">
      {crumbs.map((item, index) => (
        <div
          className={classNames(
            "flex",
            index !== crumbs.length - 1 && "text-surface-500",
          )}
        >
          <ArrowLeft1 />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}
