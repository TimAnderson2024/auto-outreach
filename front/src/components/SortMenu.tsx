import { useState } from "react";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/esm/Dropdown";
import DropdownButton from "react-bootstrap/esm/DropdownButton";

import type { SortOption, SortChange } from "../utils/SortUtils";
import { sortDirs } from "../utils/SortUtils";

interface sortMenuProps {
  sortFields: SortOption[]; // The field to sort on
  onSortChange: (value: SortChange) => void;
}

function SortMenu({ sortFields, onSortChange }: sortMenuProps) {
  const [sortField, setSortField] = useState(sortFields[0]);
  const [sortDir, setSortDir] = useState(sortDirs[0]);

  const handleSortChange = (
    newSortField: SortOption,
    newSortDir: SortOption
  ) => {
    setSortField(newSortField);
    setSortDir(newSortDir);
    onSortChange({ field: sortField.value, dir: sortDir.value });
  };

  return (
    <Container className="d-flex justify-content-start ms-0 ps-0 align-items-center">
      <span className="align-middle me-2">Sort Contacts By</span>
      <DropdownButton
        id="dropdown-basic-button"
        title={`${sortField.label}`}
        size="sm"
      >
        {sortFields.map((sortField) => (
          <Dropdown.Item
            key={sortField.value}
            onClick={() => handleSortChange(sortField, sortDir)}
          >
            {sortField.label}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      <span className="align-middle ms-2 me-2">:</span>
      <DropdownButton
        id="dropdown-basic-button"
        title={`${sortDir.label}`}
        size="sm"
      >
        {sortDirs.map((sortDir) => (
          <Dropdown.Item
            key={sortDir.value}
            onClick={() => handleSortChange(sortField, sortDir)}
          >
            {sortDir.label}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </Container>
  );
}

export default SortMenu;
