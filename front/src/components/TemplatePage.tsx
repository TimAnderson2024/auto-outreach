import type { ReactNode } from "react";
import { Container } from "react-bootstrap";
import Header from "./Header.tsx";

interface TemplatePageProps {
  children: ReactNode;
}

function TemplatePage({ children }: TemplatePageProps) {
  return (
    <>
      <Container fluid className="mb-4"> 
        <Header/> 
      </Container>
      <Container fluid className="mx-auto" style={{ maxWidth: "1600px" }}>
        <div className="p-3">
          {children}
        </div>
      </Container>
    </>
  );
}

export default TemplatePage;
