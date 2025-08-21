import type { ReactNode } from "react";
import { Container } from "react-bootstrap";
import Header from "./Header.tsx";

interface TemplatePageProps {
  children: ReactNode;
}

function TemplatePage({ children }: TemplatePageProps) {
  return (
    <Container fluid>
        <Header />
        <hr className="mt-2" />
        {children}
        <hr />
    </Container>
  );
}

export default TemplatePage;
