import { ThemeController } from "./ThemeController";

export const Navbar = () => {
  return (
    <div className="navbar bg-base-100 sticky top-0 z-50">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">SortWave</a>
      </div>
      <div className="flex-none">
        <ThemeController />
      </div>
    </div>
  );
};