import React from 'react';
import { Button, styled, keyframes } from '@mui/material';

const borderSparkle = keyframes`
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
`;

const SparkleButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  padding: '8px 24px',
  fontSize: '0.875rem',
  fontFamily: 'Kanit',
  fontWeight: 500,
  color: theme.palette.common.white,
  background: `linear-gradient(45deg, 
    ${theme.palette.grey[900]} 0%, 
    ${theme.palette.grey[800]} 50%, 
    ${theme.palette.grey[900]} 100%)`,
  border: 'none',
  isolation: 'isolate',
  textTransform: 'none',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: -1,
    padding: 1,
    borderRadius: 'inherit',
    background: `linear-gradient(45deg,
      transparent 20%,
      rgba(255, 255, 255, 0.1) 25%,
      rgba(255, 255, 255, 0.9) 35%,
      rgba(255, 255, 255, 0.1) 45%,
      transparent 80%)`,
    backgroundSize: '200% 200%',
    animation: `${borderSparkle} 3s linear infinite`,
    WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
  },

  '&:hover': {
    background: `linear-gradient(45deg, 
      ${theme.palette.grey[800]} 0%, 
      ${theme.palette.grey[700]} 50%, 
      ${theme.palette.grey[800]} 100%)`,
  },
}));

const ConversionChangerButton = ({ onClick, currencySymbol, isEnabled }) => {
  return (
    <SparkleButton
      variant="contained"
      onClick={onClick}
      disabled={!isEnabled}
    >
      Change to {currencySymbol === '$' ? 'PHP' : 'USD'}
    </SparkleButton>
  );
};

export default ConversionChangerButton;