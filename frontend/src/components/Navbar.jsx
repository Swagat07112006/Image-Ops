import { NavLink } from "react-router-dom";

function Navbar() {
  function linkClass({ isActive }) {
    return isActive
      ? "px-4 py-2 rounded-full bg-indigo-600 text-white text-sm font-medium transition"
      : "px-4 py-2 rounded-full text-gray-600 text-sm font-medium hover:bg-gray-100 transition";
  }

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-3 flex justify-between items-center">
        <NavLink to="/" className="flex items-center gap-2">
          <span className="text-2xl">🖼️</span>
          <span className="text-lg font-bold text-gray-800 tracking-tight">ImageOps</span>
        </NavLink>
        <div className="flex gap-2">
          <NavLink to="/" end className={linkClass}>Upload</NavLink>
          <NavLink to="/admin" className={linkClass}>Admin</NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
