import { Box, Tab, Tabs } from '@mui/material';
import React from 'react';
import { CoachTab } from '../../models/types';
import { ReduxCoachSchedule } from './schedule/ReduxCoachSchedule';
import { ReduxCoachAvailability } from './availibility/ReduxCoachAvailability';
import { ReduxCoachScoresPage } from './scores/ReduxCoachScores';
export const CoachPage = ({
    tab,
    coachId,
    onTabChange
}: {
    tab: CoachTab;
    coachId: string;
    onTabChange: (tab: CoachTab) => any;
}) => {
    return (
        <div>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tab} onChange={(_, value) => onTabChange(value)}>
                    <Tab label="Availability" value={CoachTab.availability} />
                    <Tab label="Upcoming Calls" value={CoachTab.schedule} />
                    <Tab label="Student Scores" value={CoachTab.scores} />
                </Tabs>
            </Box>
            {tab === CoachTab.schedule && (
                <div>
                    <ReduxCoachSchedule coachId={coachId} />
                </div>
            )}
            {tab === CoachTab.scores && <ReduxCoachScoresPage coachId={coachId} />}
            {tab === CoachTab.availability && <ReduxCoachAvailability coachId={coachId} />}
        </div>
    );
};
