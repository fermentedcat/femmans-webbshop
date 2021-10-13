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
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const StyledBox = styled(Box)(() => ({
  borderBottom: '3px solid #292828',
  paddingBottom: '1em'
}));

export const BasicModal = (props) => {
  const { open, onClose, title, descriptions, content, buttons } = props;

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
          {descriptions && descriptions.map(desc => {
            return (
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {desc}
              </Typography>
            )}
          )}
        </StyledBox>
        {content}
        {buttons && buttons}
      </Box>
    </Modal>
  );
};
