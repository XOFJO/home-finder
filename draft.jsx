<div className="newPage">
  <div id="page-wrapper">
    <header id="header">
      <h1>
        <a
          onClick={() => {
            navigate('/');
          }}
          style={{ cursor: 'pointer' }}
        >
          Home Finder
        </a>
      </h1>
      <nav id="nav">
        <ul>
          <li>
            <a
              onClick={() => {
                navigate('/');
              }}
              style={{ cursor: 'pointer' }}
            >
              Home
            </a>
          </li>
          <li></li>
          <li>
            <a
              onClick={() => {
                navigate('/profile');
              }}
              className="button"
            >
              Profile
            </a>
          </li>
        </ul>
      </nav>
    </header>
  </div>
</div>;
