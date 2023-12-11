import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import React from 'react';
import { CoachAvailability, LoadedItem, LoadedItemFactory, TimeBlock } from '../../../models/types';
import { Calendar } from '../../../components/Calendar';
import styles from './coachPage.css';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    MenuItem,
    Select
} from '@mui/material';

export const CoachAvailabilityPage = ({
    coachId,
    availability,
    onAddAvailability,
    onUnload,
    onLoad
}: {
    coachId: string;
    availability: LoadedItem<TimeBlock[]>;
    onAddAvailability: (availability: CoachAvailability) => any;
    onUnload: any;
    onLoad: (coachId: string, startDate: Date, endDate: Date) => {};
}) => {
    const [startDate, setStartDate] = useState(dayjs().startOf('week'));
    const [endDate, setEndDate] = useState(dayjs().endOf('week'));
    const [availabilityDate, setAvailabilityDate] = useState<Date | null>(null);
    const [range, setRange] = useState(2);
    useEffect(() => {
        onLoad(coachId, startDate.toDate(), endDate.toDate());
    }, [coachId, startDate, endDate]);
    useEffect(() => {
        if (LoadedItemFactory.isUnloaded(availability)) {
            onLoad(coachId, startDate.toDate(), endDate.toDate());
        }
    }, [availability]);

    useEffect(() => {
        return onUnload;
    }, []);
    if (!LoadedItemFactory.isLoaded(availability)) {
        return <h1>Loading...</h1>;
    }
    return (
        <section className={styles.coachPage}>
            <div className={styles.headerRow}>
                <button
                    onClick={() => {
                        setStartDate(startDate.add(-7, 'days'));
                        setEndDate(endDate.add(-7, 'days'));
                    }}
                >
                    Previous
                </button>
                <span>
                    {startDate.format('MMMM DD, YYYY')} - {endDate.format('MMMM DD, YYYY')}
                </span>
                <button
                    onClick={() => {
                        setStartDate(startDate.add(7, 'days'));
                        setEndDate(endDate.add(7, 'days'));
                    }}
                >
                    Next
                </button>
            </div>
            <Calendar
                availability={availability.item!}
                onClick={(date: Date) => {
                    setAvailabilityDate(date);
                    setRange(2);
                }}
                canClick={(_: Date, { isAvailable, isPast }: any) => !isPast && !isAvailable}
                startDate={startDate.toDate()}
                endDate={endDate.toDate()}
            />
            <Dialog open={Boolean(availabilityDate)} onClose={() => setAvailabilityDate(null)}>
                <DialogTitle>
                    Adding Availability {dayjs(availabilityDate).format('MMMM DD, YYYY hh:mm a')}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>Select duration of availability</DialogContentText>
                    <Select
                        value={range}
                        label="Age"
                        onChange={(evt) => setRange(evt.target.value as number)}
                    >
                        {[2, 2.5, 3, 3.5, 4, 4.5, 6, 6.5, 7, 7.5, 8].map((h) => (
                            <MenuItem value={h}>{h} hours</MenuItem>
                        ))}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAvailabilityDate(null)}>Cancel</Button>
                    <Button
                        onClick={() => {
                            onAddAvailability({
                                availabilityId: '',
                                startTime: availabilityDate!.toISOString(),
                                endTime: dayjs(availabilityDate).add(range, 'hours').toISOString(),
                                coachId
                            });
                            setAvailabilityDate(null);
                        }}
                    >
                        Add Availability
                    </Button>
                </DialogActions>
            </Dialog>
        </section>
    );
};
