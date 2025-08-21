import Button from "react-bootstrap/esm/Button";

function PaginationControls() {
    return (
        <div className="d-flex gap-2 align-items-center">
            <Button variant="outline-primary" size="sm" className="px-3 text-nowrap">
                <i className="bi bi-chevron-left me-1"></i>
                Previous
            </Button>
            <span className="mx-2 text-muted text-nowrap">Page 1 of 3</span>
            <Button variant="outline-primary" size="sm" className="px-3 text-nowrap"> 
                Next <i className="bi bi-chevron-right ms-1"></i>
            </Button>
        </div>
    );
}

export default PaginationControls