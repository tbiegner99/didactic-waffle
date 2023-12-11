import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import React from 'react';
import { LoadedItem, LoadedItemFactory, TimeBlock } from '../../../models/types';
import { Calendar } from '../../../components/Calendar';
import styles from './coachPage.css';

export const CoachSchedulePage = ({
    coachId,
    schedule,
    onUnload,
    onLoad
}: {
    coachId: string;
    schedule: LoadedItem<TimeBlock[]>;
    onUnload: any;
    onLoad: (coachId: string, startDate: Date, endDate: Date) => {};
}) => {
    const [startDate, setStartDate] = useState(dayjs().startOf('week'));
    const [endDate, setEndDate] = useState(dayjs().endOf('week'));
    useEffect(() => {
        onLoad(coachId, startDate.toDate(), endDate.toDate());
    }, [coachId, startDate, endDate]);
    useEffect(() => {
        return onUnload;
    }, []);
    if (!LoadedItemFactory.isLoaded(schedule)) {
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
                booked={schedule.item!}
                canClick={(date: Date, { isTaken }: any) => {
                    return isTaken;
                }}
                startDate={startDate.toDate()}
                endDate={endDate.toDate()}
            />
        </section>
    );
};
