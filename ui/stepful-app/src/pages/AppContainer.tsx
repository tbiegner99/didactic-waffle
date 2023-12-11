import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './app.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { urls } from '../utils/constants/urls';
import { CoachTab } from '../models/types';

function AppContent() {
    const onNavigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openMenu, setOpenMenu] = useState<null | string>(null);

    const handleMenu = (menuType: string) => (event: React.MouseEvent<HTMLElement>) => {
        setOpenMenu(menuType);
        setAnchorEl(event.currentTarget);
    };

    const closeMenu = () => setAnchorEl(null);

    return (
        <section className={styles.appContainer}>
            <AppBar position="static">
                <Toolbar>
                    <div>
                        <MenuItem onClick={handleMenu('coaches')}>
                            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                Coaches
                            </Typography>
                        </MenuItem>
                        <Menu
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left'
                            }}
                            keepMounted
                            open={openMenu === 'coaches' && Boolean(anchorEl)}
                            onClose={closeMenu}
                        >
                            <MenuItem
                                onClick={() => {
                                    onNavigate(urls.coach('1', CoachTab.availability));
                                    closeMenu();
                                }}
                            >
                                Coach 1
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    onNavigate(urls.coach('2', CoachTab.availability));
                                    closeMenu();
                                }}
                            >
                                Coach 2
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    onNavigate(urls.coach('3', CoachTab.availability));
                                    closeMenu();
                                }}
                            >
                                Coach 3
                            </MenuItem>
                        </Menu>
                    </div>
                    <div>
                        <MenuItem onClick={handleMenu('students')}>
                            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                Students
                            </Typography>
                        </MenuItem>
                        <Menu
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left'
                            }}
                            keepMounted
                            open={openMenu === 'students' && Boolean(anchorEl)}
                            onClose={closeMenu}
                        >
                            <MenuItem
                                onClick={() => {
                                    onNavigate(urls.student('1'));
                                    closeMenu();
                                }}
                            >
                                Student 1
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    onNavigate(urls.student('2'));
                                    closeMenu();
                                }}
                            >
                                Student 2
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    onNavigate(urls.student('1'));
                                    closeMenu();
                                }}
                            >
                                Student 3
                            </MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
            <main className={styles.appContent}>
                <Outlet />
            </main>
            <footer></footer>
        </section>
    );
}

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

const ReduxApp = connect(mapStateToProps, mapDispatchToProps)(AppContent);

function AppContainer() {
    return <ReduxApp />;
}

export default AppContainer;
