import React, { useState, useEffect } from "react";
import { Fab, Zoom, styled } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";

// Styled Fab component with custom animation
const StyledFab = styled(Fab)(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(4),
  right: theme.spacing(4),
  background: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  color: "#ffffff",
  zIndex: 1000,
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    background: "rgba(255, 255, 255, 0.1)",
    transform: "translateY(-5px)",
  },
  "@keyframes pulse": {
    "0%": {
      boxShadow: "0 0 0 0 rgba(255, 255, 255, 0.2)",
    },
    "70%": {
      boxShadow: "0 0 0 10px rgba(255, 255, 255, 0)",
    },
    "100%": {
      boxShadow: "0 0 0 0 rgba(255, 255, 255, 0)",
    },
  },
  animation: "pulse 2s infinite",
}));

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <Zoom in={isVisible}>
      <StyledFab
        size="small"
        aria-label="scroll back to top"
        onClick={scrollToTop}
        sx={{
          fontSize: "0.75rem",
        }}
      >
        <KeyboardArrowUp />
      </StyledFab>
    </Zoom>
  );
};

export default ScrollToTop;
