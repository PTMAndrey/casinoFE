import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { HiOutlineBuildingOffice } from 'react-icons/hi2';
import { LuDices } from "react-icons/lu";

import { BsFillCaretDownFill } from 'react-icons/bs';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import styles from './Header.module.scss';
import { ReactComponent as Logout } from "../../assets/icons/logout.svg";


const Header = (props) => {
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <Navbar key={props.expand} bg="black" sticky="top" expand={props.expand} className='border-bottom'>
        <Container fluid className="d-flex align-items-center justify-content-between">
          <Navbar.Brand href="/" className='text-white'><LuDices style={{ fontSize: '30px', color: ' white' }} />{width > 300 && 'Casino'}</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${props.expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${props.expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${props.expand}`}
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${props.expand}`}>
                <Nav.Link href="/" className='text-white'><LuDices style={{ fontSize: '30px', color: ' white' }} />{width > 264 && 'Casino'}</Nav.Link>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className={styles.bodyNav}>
              <Nav className="justify-content-end flex-grow-1 pe-3 p-2 d-flex align-items-center">
                <Nav.Link href="/" className='text-white'>Acasa</Nav.Link>
                <Nav.Link href="/roulette" className='text-white'>Roulette</Nav.Link>
                {user?.rol === 'Admin' && <Nav.Link href="/utilizatori" className='text-white'>Utilizatori </Nav.Link>}


                {!user ? (
                  <Nav.Link
                    href="/login"
                    className='text-white'
                  >
                    Conectare
                  </Nav.Link>
                ) : (
                  <NavDropdown
                    title={
                      <div className={styles.profile}>
                        <div className={styles.photoDiv}>
                          <img
                            src={user?.imagine}
                            alt=""
                            className={`${styles.userPhoto}`}
                          />
                        </div>
                        <div>
                          {user?.nume}
                          <BsFillCaretDownFill />
                        </div>
                      </div>
                    }
                    className={`${styles.profileTitle} text-white `}
                    id={`offcanvasNavbarDropdown-expand-${props.expand}`}
                  >
                    <NavDropdown.Item
                      // className={`${styles.hello}`}
                      href="/profil"
                    >
                      Profil
                    </NavDropdown.Item>

                    <NavDropdown.Divider />

                    <NavDropdown.Item
                      onClick={handleLogout}
                      className={styles.profileOption}
                    >
                      <Logout className={styles.logout} />
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                )}

              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

    </>
  )
}

export default Header