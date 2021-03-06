import React from 'react';

import { styled } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto',
  maxHeight: '80vh',
};

const StyledBox = styled(Box)(() => ({
  paddingBottom: '1em',
}));

export const BasicModal = (props) => {
  const {
    open, onClose, title, descriptions, children,
  } = props;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <StyledBox>
          {title && (
            <Typography id="modal-modal-title" variant="h5" component="h2">
              {title}
            </Typography>
          )}
          {descriptions
            && descriptions.map((desc) => (
              <Typography
                key={desc}
                id="modal-modal-description"
                sx={{ mt: 2 }}
              >
                {desc}
              </Typography>
            ))}
        </StyledBox>
        {children}
      </Box>
    </Modal>
  );
};
