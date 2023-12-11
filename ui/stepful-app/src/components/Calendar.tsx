import React from 'react';
import { TimeBlock } from '../models/types';
import styles from './calendar.css';
import dayjs from 'dayjs';
import { Dayjs } from 'dayjs';
import combineClasses from 'classnames';
import { DateUtils } from '../utils/DateUtils';

export interface SlotState {
    isAvailable: boolean;
    isTaken: boolean;
    isPast: boolean;
}

const Slot = ({
    date,
    isAvailable,
    isTaken,
    isPast,
    isDisabled,
    isClickable,
    onClick
}: {
    onClick?: (date: Date) => any;
    date: Dayjs;
    isPast: boolean;
    isDisabled: boolean;
    isClickable: boolean;
    isAvailable: boolean;
    isTaken: boolean;
}) => {
    return (
        <div
            onClick={() => isClickable && !isDisabled && onClick && onClick(date.toDate())}
            className={combineClasses(styles.slot, {
                [styles.clickable]: !isDisabled && isClickable,
                [styles.disabled]: isDisabled,
                [styles.isPast]: isPast,
                [styles.available]: isAvailable,
                [styles.taken]: isTaken
            })}
            title={
                date.format('MM/DD/YYYY hh:mma') +
                ' ' +
                `${!isAvailable && !isTaken ? 'Unavailable' : isTaken ? 'Booked' : 'Available'}`
            }
        ></div>
    );
};

const Day = ({
    day,
    availability,
    booked,
    canClick = () => false,
    isDisabled = () => false,
    onClick
}: {
    day: Dayjs;
    availability: TimeBlock[];
    booked: TimeBlock[];
    onClick?: (date: Date, state: SlotState, availability: TimeBlock[], booked: TimeBlock[]) => any;
    canClick: (
        data: Date,
        state: SlotState,
        availability: TimeBlock[],
        booked: TimeBlock[]
    ) => boolean;
    isDisabled: (
        data: Date,
        state: SlotState,
        availability: TimeBlock[],
        booked: TimeBlock[]
    ) => boolean;
}) => {
    const slots: any[] = [];
    slots.push(<div className={styles.slotHeader}>{day.format('ddd MM/DD')}</div>);
    for (
        var start = day.startOf('day');
        !start.isAfter(day.endOf('day'));
        start = start.add(30, 'minutes')
    ) {
        const date = start.toDate();
        const availableBlock = availability.find((block) => DateUtils.dateIsInBlock(date, block));
        const isTaken = booked.some((block) => DateUtils.dateIsInBlock(date, block));
        const isPast = start.isBefore(dayjs().startOf('day'));
        const state = { isAvailable: Boolean(availableBlock), isTaken, isPast };
        const isClickable = canClick(date, state, availability, booked);

        const disabled = isDisabled(date, state, availability, booked);

        const click = () => onClick && onClick(date, state, availability, booked);
        slots.push(
            <Slot
                isClickable={isClickable}
                onClick={click}
                isPast={isPast}
                isDisabled={disabled}
                date={start}
                isTaken={isTaken}
                isAvailable={Boolean(availableBlock)}
            />
        );
    }
    return <div className={styles.day}>{slots}</div>;
};

const TimeLabel = () => {
    const slots: any[] = [];
    slots.push(<div className={styles.slotHeader}></div>);

    for (
        var start = dayjs().startOf('day');
        !start.isAfter(dayjs().endOf('day'));
        start = start.add(30, 'minutes')
    ) {
        slots.push(<div className={styles.timeLabel}>{start.format('hh:mma')}</div>);
    }
    return <div className={styles.day}>{slots}</div>;
};

export const Calendar = ({
    availability = [],
    booked = [],
    canClick = () => false,
    onClick,

    isDisabled = () => false,
    startDate,
    endDate
}: {
    availability?: TimeBlock[];
    booked?: TimeBlock[];
    onClick?: (date: Date, state: SlotState, availability: TimeBlock[], booked: TimeBlock[]) => any;
    isDisabled?: (
        data: Date,
        state: SlotState,
        availability: TimeBlock[],
        booked: TimeBlock[]
    ) => boolean;
    canClick?: (
        data: Date,
        state: { isAvailable: boolean; isTaken: boolean },
        availability: TimeBlock[],
        booked: TimeBlock[]
    ) => boolean;
    startDate: Date;
    endDate: Date;
}) => {
    const days: any[] = [];
    for (
        var start = dayjs(startDate).startOf('day');
        !start.isAfter(endDate);
        start = start.add(1, 'day')
    ) {
        days.push(
            <Day
                isDisabled={isDisabled}
                onClick={onClick}
                canClick={canClick}
                availability={availability}
                booked={booked}
                key={start.valueOf()}
                day={start}
            />
        );
    }
    return (
        <section className={styles.calendar}>
            <TimeLabel />
            {...days}
        </section>
    );
};
