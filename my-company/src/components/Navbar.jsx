import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navItems = [
    { id: 1, title: 'Home', path: '/' },
    { id: 2, title: 'About', path: '/about' },
    { id: 3, title: 'Services', path: '/services' },
    { id: 4, title: 'Contact', path: '/contact' },
  ];

  const location = useLocation();

  const navStyle = {
    backgroundColor: '#111827',
    padding: '0.9rem 0',
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    boxShadow: '0 6px 18px -6px rgba(0,0,0,0.5)',
    backdropFilter: 'blur(8px)',
  };

  const navContainerStyle = {
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 48px'
  };

  const logoStyle = {
    color: '#fff',
    fontSize: '2rem',
    fontWeight: 'bold',
    margin: 0,
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
  };

  const ulStyle = {
    listStyle: 'none',
    display: 'flex',
    gap: '4px',
    margin: 0,
    padding: 0
  };

  const baseLinkStyle = {
    color: '#cbd5e1',
    textDecoration: 'none',
    padding: '14px 26px',
    borderRadius: '10px',
    fontWeight: '600',
    fontSize: '1rem',
    letterSpacing: '.5px',
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'background .35s, color .35s, transform .3s',
    overflow: 'hidden'
  };

  return (
    <nav style={navStyle}>
      <div style={navContainerStyle}>
        <h1 style={logoStyle}>My Company</h1>
        <ul style={ulStyle}>
          {navItems.map(item => {
            const active = location.pathname === item.path;
            const style = {
              ...baseLinkStyle,
              background: active ? 'linear-gradient(90deg,#1d4ed8,#3b82f6)' : 'transparent',
              color: active ? 'white' : baseLinkStyle.color,
              boxShadow: active ? '0 6px 20px -4px rgba(29,78,216,0.5)' : 'none',
              border: active ? '1px solid #3b82f6' : '1px solid transparent'
            };
            return (
              <li key={item.id}>
                <Link
                  to={item.path}
                  style={style}
                  onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(90deg,#2563eb,#3b82f6)'}
                  onMouseLeave={e => e.currentTarget.style.background = active ? 'linear-gradient(90deg,#1d4ed8,#3b82f6)' : 'transparent'}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;