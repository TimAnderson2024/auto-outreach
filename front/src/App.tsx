import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ContactsPage from "./pages/ContactsPage.tsx";
import CompanyPage from "./pages/CompanyPage.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/contact-view" replace />} />
        <Route path="/contact-view" element={<ContactsPage />} />
        <Route path="/company-view" element={<CompanyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
