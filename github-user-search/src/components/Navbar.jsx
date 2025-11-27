import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 mb-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          GitHub User Search
        </Link>

        <div className="flex gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            class="font-medium text-[#646cff] hover:text-[#535bf2] no-underline">

            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}