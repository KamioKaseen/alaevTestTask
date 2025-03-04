import { Modal, Box, Typography, Button, CircularProgress } from '@mui/material';
import { FC } from 'react';

interface ProfileModalProps {
  open: boolean;
  authorLoading: boolean;
  quoteLoading: boolean;
  authorIsSuccess: boolean;
  quoteIsSuccess: boolean;
  cancel: () => void;
}

const ProfileModal: FC<ProfileModalProps> = ({ 
    open, 
    authorLoading, 
    authorIsSuccess, 
    quoteIsSuccess, 
    quoteLoading, 
    cancel 
  }) => {
  if (!open) return null;

  return (
    <Modal
      open={open}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          justifySelf: 'center',
          m: 13,
          width: 'fit-content',
          borderRadius: 1,
          bgcolor: 'white',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-title" variant="h3" component="h2">
          Requesting the quote
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2 }}>
          Step 1: Requesting author... {authorLoading && <CircularProgress size={15}/>} {authorIsSuccess && 'completed'}
        </Typography>
        <Typography id="modal-description">
          Step 2: Requesting quote... {quoteLoading && <CircularProgress size={15} />} {quoteIsSuccess  && 'completed'}
        </Typography>

        <Button onClick={cancel} variant="contained" size="large" sx={{ mt: 4 }}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default ProfileModal;