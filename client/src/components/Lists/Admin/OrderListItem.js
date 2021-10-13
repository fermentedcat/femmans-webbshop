import React, { useEffect, useState } from 'react';

import { styled } from '@mui/material/styles';
import { Button, ListItem, ListItemText, Select, MenuItem } from '@mui/material';

import { BasicModal } from '../../Layout/BasicModal';
import { AddressForm } from '../../Form/AddressForm';
import { OrderTable } from '../../Table/OrderTable';

import { useFetch } from '../../../hooks/useFetch';
import { deleteOrder } from '../../../api/api';

const StyledListItem = styled(ListItem)(() => ({
  borderBottom: '2px solid #f0f0f0',
  padding: '1em',
  button: {
    padding: '1.05em',
    border: '1px solid #f0f0f0',
  },
}));

const StyledSelect = styled(Select)(() => ({
  width: '10em',
  padding: 0,
  marginRight: '1em',
}));

export const OrderListItem = ({ order, afterUpdate }) => {
  const [status, setStatus] = useState(order.status);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { error: deleteError, run: deleteRun } = useFetch(deleteOrder, 'token', order._id);

  //TODO: useFetch
  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    const response = await fetch(
      `http://localhost:3000/api/orders/${order._id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      }
    );
    if (!response.ok) {
      console.log("couldn't set status");
      //TODO: set notification?
    } else {
      setStatus(newStatus);
      //TODO: set notification?
    }
  };

  const handleAddressEdit = async (address) => {
    const data = { address: address };
    const response = await fetch(
      `http://localhost:3000/api/orders/${order._id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      console.log('error saving update');
      //TODO: set notification?
    } else {
      toggleEdit();
      afterUpdate();
      //TODO: set notification?
    }
  };

  const handleDelete = async (e) => {
    if (!window.confirm('Är du säker på att du vill radera denna order?')) {
      return;
    }

    deleteRun();
    if (deleteError) return console.log(deleteError);
    afterUpdate();
  };

  const toggleShowModal = (order) => {
    setShowModal(!showModal);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const orderInfo = <OrderTable afterUpdate={afterUpdate} order={order} />;
  const form = (
    <AddressForm order={order} onSubmitHandler={handleAddressEdit} />
  );
  const editButton = (
    <Button color={isEditing ? 'warning' : 'primary'} onClick={toggleEdit}>
      {isEditing ? 'Ångra' : 'Ändra adress'}
    </Button>
  );
  const timeStamp = new Date(order.createdAt).toLocaleString('se-SE');

  useEffect(() => {
    if (!showModal) setIsEditing(false);
  }, [showModal]);

  return (
    <>
      <StyledListItem>
        <ListItemText primary={`ID: ${order._id}`} secondary={timeStamp} />
        <StyledSelect
          id="demo-simple-select"
          value={status}
          onChange={handleStatusChange}
        >
          <MenuItem value="Registered">Registrerad</MenuItem>
          <MenuItem value="Processing">Behandlas</MenuItem>
          <MenuItem value="Shipped">Under leverans</MenuItem>
          <MenuItem value="Delivered">Levererad</MenuItem>
        </StyledSelect>
        <Button onClick={toggleShowModal}>Öppna</Button>
        <Button onClick={handleDelete} color="warning">
          Ta bort
        </Button>
      </StyledListItem>

      <BasicModal
        open={showModal}
        onClose={toggleShowModal}
        title={isEditing ? 'Ändra leveransadress' : 'Orderdetaljer'}
        descriptions={[`Order ID ${order._id}`, `Orderdatum: ${timeStamp}`]}
        content={isEditing ? form : orderInfo}
        buttons={editButton}
      />
    </>
  );
};
