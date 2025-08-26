import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/esm/Dropdown";
import DropdownButton from "react-bootstrap/esm/DropdownButton";

import type { SortOption } from "../utils/SortUtils";

interface sortMenuProps {
  curField: SortOption;
  curDir: SortOption;
  allFields: SortOption[];
  allDirs: SortOption[];
  onSortChange: (newField: SortOption, newDir: SortOption) => void;
}

function SortMenu({
  curField,
  curDir,
  allFields,
  allDirs,
  onSortChange,
}: sortMenuProps) {
  return (
    <Container className="d-flex justify-content-start ms-0 ps-0 align-items-center">
      <span className="align-middle me-2">Sort Contacts By</span>
      <DropdownButton
        id="dropdown-basic-button"
        title={`${curField.label}`}
        size="sm"
      >
        {allFields.map((field: SortOption) => (
          <Dropdown.Item
            key={field.value}
            onClick={() => onSortChange(field, curDir)}
          >
            {field.label}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      <span className="align-middle ms-2 me-2">:</span>
      <DropdownButton
        id="dropdown-basic-button"
        title={`${curDir.label}`}
        size="sm"
      >
        {allDirs.map((dir) => (
          <Dropdown.Item
            key={dir.value}
            onClick={() => onSortChange(curField, dir)}
          >
            {dir.label}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </Container>
  );
}

export default SortMenu;
