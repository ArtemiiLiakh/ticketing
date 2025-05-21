import Link from 'next/link';
import { Nav } from 'react-bootstrap';

const Header = ({ user }: any) => {
  const links = [
    { auth: true, href: '/', label: 'Home' },
    { auth: false, href: '/auth/login', label: 'Login'},
    { auth: false, href: '/auth/signup', label: 'Sign up'},
    { auth: true, href: '/auth/signout', label: 'Sign out'},
  ].filter(({ auth }) => !auth === !user)
  .map(({ href, label }, index) => {
    return (
      <Nav.Item className='nav-item' key={index}>
        <Link href={href}>{label}</Link>
      </Nav.Item>
    );
  });

  return (
    <div className="header">
      <nav className='navbar navbar-light bd-light' data-bs-theme="light">
        <div>
          <Nav.Item>
            <Link href='/'>App</Link>
          </Nav.Item>
          <Nav.Item>
            <Link href='/tickets/new'>New ticket</Link>
          </Nav.Item>
          <Nav.Item>
            <Link href='/tickets'>Tickets</Link>
          </Nav.Item>
        </div>
        <div className="d-flex justify-content-end">
          <Nav className='d-flex align-items-center'>
            {links}
            <Nav.Item>
              {user ? 'You are logged in' : 'Unauthorized'}
            </Nav.Item>
          </Nav>
        </div>
      </nav>
    </div>
  );
}
 
export default Header;