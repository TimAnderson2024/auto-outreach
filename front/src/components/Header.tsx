import { Container, Navbar, Nav } from "react-bootstrap";

function Header() {
    return (
        <Navbar expand="lg" className="bg-light border-bottom">
            <Container fluid className="mx-auto" style={{ maxWidth: "1600px" }}>
                <Navbar.Brand href="#">Auto Outreach</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="#contacts" className="text-dark">Contacts</Nav.Link>
                        <Nav.Link href="#companies" className="text-dark">Companies</Nav.Link>
                        <Nav.Link href="#to-do" className="text-dark">To-Do</Nav.Link>
                        <Nav.Link href="calendar" className="text-dark">Calendar</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;