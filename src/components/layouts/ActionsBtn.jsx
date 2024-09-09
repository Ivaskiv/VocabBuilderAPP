import { IconButton, MenuItem, Popover } from '@mui/material';
import { useCallback, useState } from 'react';
import { IoIosMore } from 'react-icons/io';
import { FiEdit2 } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';

const ActionsBtn = ({ row, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  // const handleOpen = e => {
  //   setAnchorEl(e.currentTarget);
  // };
  const handleOpen = ({ currentTarget }) => setAnchorEl(currentTarget);

  const handleClose = () => {
    setAnchorEl(null);
    setOpenModal(false);
  };
  const handleEdit = useCallback(() => {
    setOpenModal(true);
    handleClose();
  }, [handleClose]);

  const handleDelete = useCallback(() => {
    onDelete(row.original.id);
    handleClose();
  }, [onDelete, row.original.id, handleClose]);

  return (
    <>
      <IconButton onClick={handleOpen}>
        <IoIosMore />
      </IconButton>
      <Popover
        open={anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
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
    </>
  );
};
export default ActionsBtn;
