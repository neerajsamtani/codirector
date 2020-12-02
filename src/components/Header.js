import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({ SignIn, SignOut, user }) => {
  return (
    <header>
      <Link to="/" className="logo">codirector</Link>
      {user ? <Link to="/projects" className="my-projects" >My Projects</Link> : null}
      {user ? <SignOut /> : <SignIn />}
    </header>
  );
};

export default Header