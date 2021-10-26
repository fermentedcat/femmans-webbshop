import React, { useState, useRef } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { NavButton } from './NavButton';
import { useFetch } from '../../hooks/useFetch';
import { getCategories } from '../../api/api';
import { useHistory } from 'react-router';

export const CategoryButton = () => {
  const { data: categories } = useFetch(getCategories);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const history = useHistory();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleOnCategoryClick = (_event, title) => {
    history.push(`/category/${title.toLowerCase()}`);
    handleToggle();
  };

  const handleOnGameClick = () => {
    history.push('/all-products');
    handleToggle();
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <div onMouseOver={handleToggle} onMouseOut={handleToggle}>
      <NavButton
        ref={anchorRef}
        id='composition-button'
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleOnGameClick}
      >
        Spel
      </NavButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement='bottom-start'
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id='composition-menu'
                  aria-labelledby='composition-button'
                  onKeyDown={handleListKeyDown}
                >
                  {categories &&
                    categories.map((category) => (
                      <MenuItem
                        onClick={(event) =>
                          handleOnCategoryClick(event, category.title)
                        }
                        key={category.title}
                      >
                        {category.title}
                      </MenuItem>
                    ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};
