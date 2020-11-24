// import react from 'react'

const Header = ({ SignIn, SignOut, user }) => {
    return (
      <header>
        <a className="logo" href="https://github.com/neerajsamtani/codirector">
          codirector
        </a>
        { user ? <SignOut /> : <SignIn /> }
      </header>
    );
  };

export default Header