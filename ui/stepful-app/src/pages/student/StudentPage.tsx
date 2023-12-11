import { Box, Tab, Tabs } from '@mui/material';
import React from 'react';
import { StudentTab } from '../../models/types';
import { ReduxStudentSchedule } from './schedule/ReduxStudentSchedule';
import { ReduxStudentScoresPage } from './scores/ReduxStudentScoresPage';
export const StudentPage = ({
    tab,
    coachId,
    studentId,
    onTabChange
}: {
    tab: StudentTab;
    studentId: string;
    coachId?: string;
    onTabChange: (tab: StudentTab, coach?: string) => any;
}) => {
    return (
        <div>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tab} onChange={(_, value) => onTabChange(value, coachId)}>
                    <Tab label="Book Call" value={StudentTab.book} />
                    <Tab label="Student Scores" value={StudentTab.scores} />
                </Tabs>
            </Box>
            {tab === StudentTab.book && (
                <div>
                    <ReduxStudentSchedule
                        onCoachChanged={(coach?: string) => onTabChange(tab, coach)}
                        studentId={studentId}
                        coachId={coachId}
                    />
                </div>
            )}
            {tab === StudentTab.scores && <ReduxStudentScoresPage studentId={studentId} />}
        </div>
    );
};
