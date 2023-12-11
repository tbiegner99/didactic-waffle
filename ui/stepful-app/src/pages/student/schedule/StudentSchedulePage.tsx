import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import React from 'react';
import { LoadedItem, LoadedItemFactory, ScheduledBlock, TimeBlock } from '../../../models/types';
import { Calendar } from '../../../components/Calendar';
import styles from './studentPage.css';
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
import { DateUtils } from '../../../utils/DateUtils';

export const StudentSchedulePage = ({
    coachId,
    availability,
    studentId,
    schedule,
    onAddBooking,
    onCoachChanged,
    onUnload,
    onLoad
}: {
    studentId: string;
    coachId?: string;
    schedule: LoadedItem<TimeBlock[]>;
    availability: LoadedItem<TimeBlock[]>;
    onAddBooking: (block: ScheduledBlock) => any;
    onUnload: any;
    onCoachChanged: (coachId?: string) => {};
    onLoad: (studentId: string, startDate: Date, endDate: Date, coachId?: string) => {};
}) => {
    const [startDate, setStartDate] = useState(dayjs().startOf('week'));
    const [endDate, setEndDate] = useState(dayjs().endOf('week'));
    const [bookingLength, setBookingLength] = useState(2);
    const [bookingDate, setBookingDate] = useState<Date | null>(null);
    useEffect(() => {
        onLoad(studentId, startDate.toDate(), endDate.toDate(), coachId);
    }, [studentId, coachId, startDate, endDate]);
    useEffect(() => {
        if (LoadedItemFactory.isUnloaded(schedule) || LoadedItemFactory.isUnloaded(availability)) {
            onLoad(studentId, startDate.toDate(), endDate.toDate(), coachId);
        }
    }, [availability, schedule]);
    useEffect(() => {
        return onUnload;
    }, []);
    if (
        coachId &&
        (!LoadedItemFactory.isLoaded(schedule) || !LoadedItemFactory.isLoaded(availability))
    ) {
        return <h1>Loading...</h1>;
    }
    return (
        <section className={styles.studentPage}>
            <div className={styles.headerRow}>
                <div>
                    Coach{' '}
                    <Select
                        sx={{ width: '200px' }}
                        value={coachId}
                        label="Coach"
                        onChange={(evt) => onCoachChanged(evt.target.value)}
                    >
                        {['1', '2', '3'].map((h) => (
                            <MenuItem value={h}>{h}</MenuItem>
                        ))}
                    </Select>
                </div>
            </div>
            {coachId && [
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
                </div>,

                <Calendar
                    availability={availability.item!}
                    booked={schedule.item!}
                    onClick={(date: Date) => {
                        setBookingDate(date);
                    }}
                    canClick={(_, { isAvailable }) => isAvailable}
                    isDisabled={(date: Date, state: any, availability: TimeBlock[]) => {
                        var startOfToday = dayjs().startOf('day');
                        if (dayjs(date).isBefore(startOfToday)) {
                            return true;
                        }
                        for (
                            var start = dayjs(date);
                            start.isBefore(dayjs(date).add(2, 'hours'));
                            start = start.add(30, 'minutes')
                        ) {
                            const isAvailable = availability.some((block) =>
                                DateUtils.dateIsInBlock(start.toDate(), block)
                            );
                            const isTaken = schedule.item!.some((block) =>
                                DateUtils.dateIsInBlock(start.toDate(), block)
                            );
                            if (!isAvailable || isTaken) {
                                return true;
                            }
                        }
                        return false;
                    }}
                    startDate={startDate.toDate()}
                    endDate={endDate.toDate()}
                />,
                <Dialog open={Boolean(bookingDate)} onClose={() => setBookingDate(null)}>
                    <DialogTitle>
                        Adding Booking For Coach {coachId} at{' '}
                        {dayjs(bookingDate).format('MMMM DD, YYYY hh:mm a')}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>Select duration of availability</DialogContentText>
                        <Select
                            value={bookingLength}
                            label="Length of Time"
                            onChange={(evt) => setBookingLength(evt.target.value as number)}
                        >
                            {[2].map((h) => (
                                <MenuItem value={h}>{h} hours</MenuItem>
                            ))}
                        </Select>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setBookingDate(null)}>Cancel</Button>
                        <Button
                            onClick={() => {
                                onAddBooking({
                                    blockId: '',
                                    studentId,
                                    startTime: bookingDate!.toISOString(),
                                    endTime: dayjs(bookingDate)
                                        .add(bookingLength, 'hours')
                                        .toISOString(),
                                    coachId: coachId || ''
                                });
                                setBookingDate(null);
                            }}
                        >
                            Create Appointment
                        </Button>
                    </DialogActions>
                </Dialog>
            ]}
        </section>
    );
};
