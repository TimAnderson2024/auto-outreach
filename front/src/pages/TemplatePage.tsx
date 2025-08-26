import type { ReactNode } from "react";
import { Container } from "react-bootstrap";
import Header from "../components/Header.tsx";

interface TemplatePageProps {
  children: ReactNode;
}

function TemplatePage({ children }: TemplatePageProps) {
  return (
    <>
      <Header />
      <Container fluid className="mx-auto mt-3" style={{ maxWidth: "1600px" }}>
        {children}
      </Container>
    </>
  );
}

export default TemplatePage;
