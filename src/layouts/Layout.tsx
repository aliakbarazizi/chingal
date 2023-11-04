import { Outlet } from "react-router-dom";
import logo from "../assets/chingal-logo 1.png";
import MoonBold from "../assets/icons/bold/Moon";
import Sun from "../assets/icons/outline/Sun";
import MenuItem from "./MenuItem";
import Home from "../assets/icons/outline/Home";
import Statistics from "../assets/icons/outline/Statistics";
import Logout from "../assets/icons/outline/Logout";
import { useSignout } from "../features/auth";
import Search from "./Search";
import { useState } from "react";
import { SearchContext } from "../context/search";

export default function Layout() {
  const signout = useSignout();

  const [showSearch, setShowSearch] = useState(false);

  return (
    <SearchContext.Provider value={setShowSearch}>
      <header className="flex h-[148px] items-center border-b-2 border-surface-300 px-12 py-6">
        <img src={logo} />
        <div className="ms-auto flex h-14 min-w-0 gap-6">
          {showSearch && <Search />}
          <div className="flex rounded-[20px] border border-surface-300 bg-gradient-to-r from-surface-100 to-surface-200 to-85% p-1.5 space-s-1">
            <button className="rounded-2xl p-2.5">
              <Sun />
            </button>
            <button className="rounded-2xl bg-primary-500 p-2.5">
              <MoonBold />
            </button>
          </div>
        </div>
      </header>
      <div className="flex min-h-0 flex-1">
        <aside className="flex w-[480px] flex-col gap-3 border-e-2 border-surface-300 p-12">
          <MenuItem
            title="خانه"
            icon={<Home className="fill-current" />}
            to="/"
          />
          <MenuItem title="لیست کاربران" icon={<Statistics />} to="/users" />
          <div className="my-3 h-0.5 rounded-sm bg-surface-300" />
          <MenuItem title="لورم ایپسوم" icon={<Home />} to="/foo-bar" />
          <MenuItem title="لورم ایپسوم" icon={<Home />} to="/foo-bar" />
          <MenuItem title="لورم ایپسوم" icon={<Home />} to="/foo-bar" />
          <MenuItem title="لورم ایپسوم" icon={<Home />} to="/foo-bar" />
          <MenuItem title="لورم ایپسوم" icon={<Home />} to="/foo-bar" />
          <div className="my-3 h-0.5 rounded-sm bg-surface-300" />
          <button
            onClick={() => signout.mutate()}
            className="flex cursor-pointer rounded-[20px] border border-transparent px-4 py-5 text-red-500 space-s-3"
          >
            <Logout />
            <span>خروج</span>
          </button>
        </aside>
        <main className="min-w-0 flex-1 overflow-y-auto p-12">
          <Outlet />
        </main>
      </div>
    </SearchContext.Provider>
  );
}
