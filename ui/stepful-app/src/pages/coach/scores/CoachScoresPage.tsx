import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import React from 'react';
import { CallScore, LoadedItem, LoadedItemFactory } from '../../../models/types';
import styles from './coachPage.css';
import {
    Button,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    MenuItem,
    Select,
    Typography
} from '@mui/material';

export const ScoreCard = ({ callScore, onEdit }: { callScore: CallScore; onEdit: () => any }) => {
    if (!callScore.score.score) {
        return (
            <Card sx={{ minWidth: 400, cursor: 'pointer' }} onClick={onEdit}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Call with {callScore.block.studentId} on{' '}
                        {dayjs(callScore.block.startTime).format('MMMM DD, YYYY hh:mm a')}
                    </Typography>
                    <Typography variant="h5" component="div"></Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        No Score Assigned
                    </Typography>
                    <Typography variant="body2">{callScore.score.notes}</Typography>
                </CardContent>
            </Card>
        );
    }
    return (
        <Card sx={{ minWidth: 400, cursor: 'pointer' }} onClick={onEdit}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Call with {callScore.block.studentId} on{' '}
                    {dayjs(callScore.block.startTime).format('MMMM DD, YYYY hh:mm a')}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Score: {callScore.score.score}
                </Typography>
                <Typography variant="body2">{callScore.score.notes}</Typography>
            </CardContent>
        </Card>
    );
};

export const CoachScoresPage = ({
    coachId,
    callScores,
    onEditScore,
    onUnload,
    onLoad
}: {
    coachId: string;
    callScores: LoadedItem<CallScore[]>;
    onEditScore: (availability: CallScore) => any;
    onUnload: any;
    onLoad: (coachId: string) => {};
}) => {
    const [editScore, setEditScore] = useState<CallScore | null>(null);
    useEffect(() => {
        onLoad(coachId);
    }, [coachId]);
    useEffect(() => {
        if (LoadedItemFactory.isUnloaded(callScores)) {
            onLoad(coachId);
        }
    }, [callScores]);

    useEffect(() => {
        return onUnload;
    }, []);
    if (!LoadedItemFactory.isLoaded(callScores)) {
        return <h1>Loading...</h1>;
    }
    return (
        <section className={styles.coachPage}>
            <div className={styles.headerRow}></div>
            <div>
                {callScores.item!.length === 0 ? (
                    <h3>No Student Scores</h3>
                ) : (
                    callScores.item!.map((callScore) => (
                        <div className={styles.cardRow}>
                            <ScoreCard
                                callScore={callScore}
                                onEdit={() =>
                                    setEditScore({
                                        block: { ...callScore.block },
                                        score: { ...callScore.score }
                                    })
                                }
                            />
                        </div>
                    ))
                )}
            </div>

            <Dialog open={Boolean(editScore)} onClose={() => setEditScore(null)}>
                <DialogTitle>
                    Updating Score for {editScore?.block.studentId} on{' '}
                    {dayjs(editScore?.block.startTime).format('MMMM DD, YYYY hh:mm a')}
                </DialogTitle>
                <DialogContent>
                    <div>
                        <div>
                            <div>Score</div>
                            <div>
                                <Select
                                    value={editScore?.score.score}
                                    placeholder="Select Score"
                                    label="Score"
                                    onChange={(evt) => {
                                        setEditScore({
                                            block: editScore!.block,
                                            score: {
                                                ...editScore!.score,
                                                score: evt.target.value as number
                                            }
                                        });
                                    }}
                                >
                                    {[1, 2, 3, 4, 5].map((h) => (
                                        <MenuItem value={h}>{h}</MenuItem>
                                    ))}
                                </Select>
                            </div>
                        </div>
                        <div>
                            <div>Notes</div>
                            <div>
                                <textarea
                                    value={editScore?.score.notes || ''}
                                    onChange={(evt) => {
                                        setEditScore({
                                            block: editScore!.block,
                                            score: {
                                                ...editScore!.score,
                                                notes: evt.target.value
                                            }
                                        });
                                    }}
                                    cols={50}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditScore(null)}>Cancel</Button>
                    <Button
                        disabled={!editScore?.score.score || !editScore?.score.notes}
                        onClick={() => {
                            onEditScore(editScore!);
                            setEditScore(null);
                        }}
                    >
                        Update Score
                    </Button>
                </DialogActions>
            </Dialog>
        </section>
    );
};
