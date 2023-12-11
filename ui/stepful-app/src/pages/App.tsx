import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppContainer from './AppContainer';
import { urls } from '../utils/constants/urls';
import { ReduxCoachPage } from './coach/ReduxCoachPage';
import { CoachTab } from '../models/types';
import { ReduxStudentPage } from './student/ReduxStudentPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={urls.BASE_URL} element={<AppContainer />}>
                    <Route path="" element={<h1>Choose </h1>} />
                    <Route path="coach/:coachId/:tab" element={<ReduxCoachPage />}></Route>
                    <Route
                        path="student/:studentId/:tab?/:coachId?"
                        element={<ReduxStudentPage />}
                    ></Route>
                </Route>
                <Route path="*" element={<Navigate to={urls.BASE_URL} />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
