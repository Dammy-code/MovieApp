import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css';


const Header= () => {
    return(
        <div className="rmdb-header">
<div className="rmdb-content">
    <Link to='/'>
 <img className="rmdb-logo" src="./images/reactMovie_logo.png" alt="rmdb-log" />
 </Link>
 <img className="rmdb-tmdb" src="./images/tmdb_logo.png" alt="tmdb_logo"/>
</div>
        </div>
    )
}
export default Header;