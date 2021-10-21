import React, { useEffect, useState } from 'react';

import { styled } from '@mui/material/styles';
import { Button, ListItem, ListItemText, Select, MenuItem } from '@mui/material/';

import { BasicModal } from '../../Layout/BasicModal';
import { CategoryForm } from '../../Form/CategoryForm';
import { updateCategory, deleteCategory } from '../../../api/api';

const StyledListItem = styled(ListItem)(() => ({
    borderBottom: '2px solid #f0f0f0',
    padding: '1em',
    button: {
        padding: '1.05em',
        border: '1px solid #f0f0f0',
    },
}));

export const CategoryListItem = ({ category, removeListItem, updateListItem}) => {
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleCategoryEdit = async (category) => {
        const data = { category: category };
        try {
            const newCategory = await updateCategory('token', data, category._id)
            updateListItem(newCategory)
            toggleEdit();
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (e) => {
        if (!window.confirm('Är du säker på att du vill radera denna kategori?')) {
            return;
        }
        try {
            await deleteCategory(category._id)
            removeListItem(category._id)
        } catch (error) {
            console.log(error)
        }
    };

    const toggleShowModal = () => {
        if(showModal){
            setIsEditing(false)
        }
        setShowModal(!showModal);
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    return (
        <>
            <StyledListItem>
                <ListItemText primary={`Kategori: ${category.title}`} />
                <Button onClick={toggleShowModal}>Öppna</Button>
                <Button onClick={handleDelete} color="warning">
                    Ta bort
                </Button>
            </StyledListItem>

            <BasicModal
                open={showModal}
                onClose={toggleShowModal}
                title={isEditing ? 'Ändra kategori' : 'Kategoridetaljer'}
                descriptions={[`${category.title}`]}
            >
                {isEditing ? <CategoryForm category={category} onSubmitHandler={handleCategoryEdit} /> : <CategoryForm updateListItem={updateListItem} category={category} />}
                    <Button color={isEditing ? 'warning' : 'primary'} onClick={toggleEdit}>
                        {isEditing ? 'Ångra' : 'Ändra kategori'}
                    </Button>
            </BasicModal>
        </>
    );
};