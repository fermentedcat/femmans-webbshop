import React, { useContext, useEffect, useState } from 'react';

import { styled } from '@mui/material/styles';
import {
  Button, ListItem, ListItemText, Select, MenuItem,
} from '@mui/material';
import { UiContext } from '../../../context/uiContext';

import { BasicModal } from '../../Layout/BasicModal';
import { AddressForm } from '../../Form/AddressForm';
import { OrderTable } from '../../Table/OrderTable';
import { updateOrder, deleteOrder } from '../../../api/api';

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

export const OrderListItem = ({ order, removeListItem, updateListItem }) => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [orderStatus, setOrderStatus] = useState('');
  const { setNotification } = useContext(UiContext);

  useEffect(() => {
    setOrderStatus(order.status);
  }, [order]);

  const toggleShowModal = () => {
    if (showModal) {
      setIsEditing(false);
    }
    setShowModal(!showModal);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    const currentStatus = orderStatus;
    setOrderStatus(newStatus);
    try {
      const newOrder = await updateOrder({ status: newStatus }, order._id);
      updateListItem(newOrder);
      setNotification({
        type: 'success',
        message: `Orderstatus för id ${order._id} har satts till '${newStatus}'.`,
      });
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Statusuppdateringen misslyckades.',
      });
      setOrderStatus(currentStatus);
    }
  };

  const handleAddressEdit = async (address) => {
    const data = { address };
    try {
      const newOrder = await updateOrder(data, order._id);
      updateListItem(newOrder.data);
      setNotification({
        type: 'error',
        message: 'Adressen har ändrats!',
      });
      toggleEdit();
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Adressändringen misslyckades.',
      });
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Är du säker på att du vill radera denna order?')) {
      return;
    }
    try {
      await deleteOrder(order._id);
      setNotification({
        type: 'success',
        message: `Ordern ${order._id} har raderats!`,
      });
      removeListItem(order._id);
    } catch (error) {
      setNotification({
        type: 'error',
        message: `Radering av order ${order._id} misslyckades.`,
      });
    }
  };

  const timeStamp = new Date(order.createdAt).toLocaleString('se-SE');

  return (
    <>
      <StyledListItem>
        <ListItemText primary={`ID: ${order._id}`} secondary={timeStamp} />
        <StyledSelect
          id="demo-simple-select"
          value={orderStatus}
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
      >
        {isEditing ? <AddressForm order={order} onSubmitHandler={handleAddressEdit} />
          : <OrderTable updateListItem={updateListItem} order={order} />}
        <Button color={isEditing ? 'warning' : 'primary'} onClick={toggleEdit}>
          {isEditing ? 'Ångra' : 'Ändra adress'}
        </Button>
      </BasicModal>

    </>
  );
};
