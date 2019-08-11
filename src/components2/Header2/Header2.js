import React from "react";
import { Link } from 'react-router-dom'

function Header2() {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/roster'>Roster</Link></li>
          <li><Link to='/schedule'>Schedule</Link></li>
        </ul>
      </nav>
    </header>
  );
}
export default Header2;