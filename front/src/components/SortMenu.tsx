
import {useState} from "react";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/esm/Dropdown";
import DropdownButton from "react-bootstrap/esm/DropdownButton";

function SortMenu() {
    const [sortBy, setSortBy] = useState('Name');
    const [order, setOrder] = useState('Asc');

    const handleSortChange = (newSortBy: string) => {
        setSortBy(newSortBy);
    };

    const handleOrderChange = (newOrder: string) => {
        setOrder(newOrder);
    };

    return (
        <Container className="d-flex justify-content-start ms-0 ps-0 align-items-center">
            <span className="align-middle me-2">Sort Contacts By</span>
            <DropdownButton id="dropdown-basic-button" title={`${sortBy}`} size="sm">
                <Dropdown.Item onClick={() => handleSortChange('Name')}>Name</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSortChange('Company')}>Company</Dropdown.Item>
            </DropdownButton>
            <span className="align-middle ms-2 me-2">:</span>
            <DropdownButton id="dropdown-basic-button" title={`${order}`} size="sm">
                <Dropdown.Item onClick={() => handleOrderChange('Asc')}>Asc</Dropdown.Item>
                <Dropdown.Item onClick={() => handleOrderChange('Desc')}>Desc</Dropdown.Item>
            </DropdownButton>
        </Container>
    );
}

export default SortMenu;