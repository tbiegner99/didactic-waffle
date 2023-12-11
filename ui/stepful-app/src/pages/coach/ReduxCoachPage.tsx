import { useNavigate, useParams } from 'react-router-dom';
import { CoachPage } from './CoachPage';
import { urls } from '../../utils/constants';
import React from 'react';
import { CoachTab } from '../../models/types';
export const ReduxCoachPage = () => {
    const { coachId, tab } = useParams();
    const onNavigate = useNavigate();
    return (
        <CoachPage
            coachId={coachId!}
            tab={(tab as CoachTab) || CoachTab.schedule}
            onTabChange={(tab) => onNavigate(urls.coach(coachId!, tab))}
        />
    );
};
