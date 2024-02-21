import NavBar from "./NavBar";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="logo">
          <Link to="/">Not Open Trivia</Link>
        </div>
        {/* TODO #3
        /// Manca afegir un component aquí (ja el tenim creat en un altre arxiu). */}
        <NavBar />
      </div>
    </header>
  );
};

export default Header;
