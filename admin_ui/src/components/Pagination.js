import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import "./Pagination.css";

const Pagination = ({users, totalPages, currentPage, onPageChange }) => {
  const [pageRange, setPageRange] = useState(5);
  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth <= 768) {
        setPageRange(1);
      } else {
        setPageRange(5);
      }
    };
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const renderPageButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i > currentPage - pageRange && i < currentPage + pageRange) {
        buttons.push(
          <Button
            variant={i === currentPage ? "contained" : "outlined"}
            size="small"
            key={i}
            onClick={() => onPageChange(i)}
          >
            {i}
          </Button>
        );
      }
    }
    return buttons;
  };

  return (
    <div>
      {users.length !==0 && (
      <Box className="pagination">
        <Button variant="contained" size="small" onClick={() => onPageChange(1)}>
          &lt;&lt;
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          &lt;
        </Button>
        {renderPageButtons()}
        <Button
          variant="contained"
          size="small"
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          &gt;
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          &gt;&gt;
        </Button>
      </Box>
      )}
    </div>
  );
};

export default Pagination;
