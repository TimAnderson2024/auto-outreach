import { Table, Button } from "react-bootstrap";
import type { Contact } from "../services/ContactService";

export type Column = {
  label: string;
  key: keyof Contact;
  render?: (contact: Contact) => React.ReactNode;
};

interface ContactTableProps {
  columns: Column[];
  contacts: Contact[];
}

function ContactTable({ columns, contacts }: ContactTableProps) {
  return (
    <Table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key}>{col.label}</th>
          ))}
          <th>{/* placeholder for buttons */}</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((contact) => (
          <tr key={contact.id}>
            {columns.map((col) => {
              let value = col.render ? col.render(contact) : contact[col.key];
              if (value instanceof Date) {
                value = value.toLocaleDateString();
              }
              return <td key={col.key}>{value ?? "N/A"}</td>;
            })}
            <td>
              <Button variant="outline-primary" size="sm" title="Edit contact">
                <i className="bi bi-pencil"></i>
              </Button>
              <Button variant="outline-danger" size="sm" title="Delete contact">
                <i className="bi bi-trash"></i>
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ContactTable;
