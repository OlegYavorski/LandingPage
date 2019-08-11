import React from "react";
import Player from "../Player/Player"
import { Link } from 'react-router-dom'
import PlayerAPI from "../PlayerAPI"

function FullRoster() {
    return (
      <div>
        <ul>
          {
              PlayerAPI.all().map(p => (

              <li key={p.number}>
                <Link to={`/roster/${p.number}`}>{p.name}</Link>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
  export default FullRoster;
  
  