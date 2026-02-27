import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white border-b p-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">Image Review App</h1>
        <div className="flex gap-4">
          <Link to="/" className="text-blue-600 hover:underline">
            Upload
          </Link>
          <Link to="/admin" className="text-blue-600 hover:underline">
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
