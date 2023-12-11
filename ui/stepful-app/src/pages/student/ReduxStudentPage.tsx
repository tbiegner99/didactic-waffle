import { useNavigate, useParams } from 'react-router-dom';
import { StudentPage } from './StudentPage';
import { urls } from '../../utils/constants';
import React from 'react';
import { StudentTab } from '../../models/types';
export const ReduxStudentPage = () => {
    const { studentId, coachId, tab } = useParams();
    const onNavigate = useNavigate();
    return (
        <StudentPage
            coachId={coachId}
            studentId={studentId!}
            tab={(tab as StudentTab) || StudentTab.book}
            onTabChange={(tab, coachId) => onNavigate(urls.student(studentId!, tab, coachId))}
        />
    );
};
