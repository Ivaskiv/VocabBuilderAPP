import { IconButton, MenuItem, Popover } from '@mui/material';
import { useCallback, useState } from 'react';
import { IoIosMore } from 'react-icons/io';
import { FiEdit2 } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import EditWordForm from '../forms/wordForm/EditWordForm';
import axios from 'axios';

const ActionsBtn = ({ row, onDeleteSuccess }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const open = Boolean(anchorEl);

  const handleOpen = event => setAnchorEl(event.currentTarget);

  const handleClose = () => {
    setAnchorEl(null);
    setOpenModal(false);
  };

  const handleEdit = useCallback(() => {
    setOpenModal(true);
    handleClose();
  }, [handleClose]);

  const handleDelete = useCallback(async () => {
    try {
      const wordId = row.original.id;
      await axios.delete(`/words/${wordId}`);
      onDeleteSuccess();
      handleClose();
    } catch (error) {
      console.error('Error deleting word: ', error);
    }
    onDeleteSuccess(row.original.id);
    handleClose();
  }, [onDeleteSuccess, row.original.id]);

  return (
    <>
      <IconButton
        onClick={handleOpen}
        aria-controls={open ? 'action-popover' : undefined}
        aria-haspopup="true"
      >
        <IoIosMore />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        id="action-popover"
      >
        <MenuItem onClick={handleEdit}>
          <FiEdit2 />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <RiDeleteBin6Line />
          Delete
        </MenuItem>
      </Popover>
      {openModal && (
        <EditWordForm
          word={row.original}
          onClose={() => setOpenModal(false)}
          onSubmitSuccess={() => {
            setOpenModal(false);
            onDeleteSuccess();
          }}
        />
      )}
    </>
  );
};

export default ActionsBtn;
