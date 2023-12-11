import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import React from 'react';
import { CallScore, LoadedItem, LoadedItemFactory } from '../../../models/types';
import styles from './studentPage.css';
import { Card, CardContent, Typography } from '@mui/material';

export const ScoreCard = ({ callScore }: { callScore: CallScore }) => {
    return (
        <Card sx={{ minWidth: 400 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    Call with {callScore.block.coachId} on{' '}
                    {dayjs(callScore.block.startTime).format('MMMM DD, YYYY hh:mm a')}
                </Typography>
                <Typography sx={{ mb: 1.5 }} variant="h6" color="text.secondary">
                    Score: {callScore.score.score}
                </Typography>
                <Typography variant="body2">{callScore.score.notes}</Typography>
            </CardContent>
        </Card>
    );
};

export const StudentScores = ({
    studentId,
    scores,
    onUnload,
    onLoad
}: {
    studentId: string;
    scores: LoadedItem<CallScore[]>;
    onUnload: any;
    onLoad: (coachId: string) => {};
}) => {
    const [editScore, setEditScore] = useState<CallScore | null>(null);
    useEffect(() => {
        onLoad(studentId);
    }, [studentId]);
    useEffect(() => {
        if (LoadedItemFactory.isUnloaded(scores)) {
            onLoad(studentId);
        }
    }, [scores]);

    useEffect(() => {
        return onUnload;
    }, []);
    if (!LoadedItemFactory.isLoaded(scores)) {
        return <h1>Loading...</h1>;
    }
    return (
        <section className={styles.coachPage}>
            <div className={styles.headerRow}></div>
            <div>
                {scores.item!.length === 0 ? (
                    <h3>No Student Scores</h3>
                ) : (
                    scores.item!.map((callScore) => (
                        <div className={styles.cardRow}>
                            <ScoreCard callScore={callScore} />
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};
