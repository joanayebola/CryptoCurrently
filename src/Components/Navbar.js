import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm fixed-top mb-5">
      <div className="container-fluid">
        {/* Brand Logo */}
        <Link className="navbar-brand d-flex align-items-center" href="/">
          <span className="fw-bold">CryptoCurrently</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
