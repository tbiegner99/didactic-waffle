import dayjs from 'dayjs';
import { TimeBlock } from '../models/types';

export class DateUtils {
    static dateIsInBlock(date: Date, block: TimeBlock) {
        return !dayjs(date).isBefore(block.startTime) && dayjs(date).isBefore(block.endTime);
    }
}
