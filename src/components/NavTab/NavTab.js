import { HashLink } from "react-router-hash-link";
import "./NavTab.css";

function NavTab() {
  return (
    <nav className="navtab">
      <ul className="navtab__links">
        <li className="navtab__links-type">
          <HashLink smooth className="navtab__link" to="#project">
            О проекте
          </HashLink>
        </li>
        <li className="navtab__links-type">
          <HashLink smooth className="navtab__link" to="#techs">
            Технологии
          </HashLink>
        </li>
        <li className="navtab__links-type">
          <HashLink smooth className="navtab__link" to="#student">
            Студент
          </HashLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;
