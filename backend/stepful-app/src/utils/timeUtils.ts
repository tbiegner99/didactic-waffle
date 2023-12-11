import { TimeBlock } from '../models/types';
import dayjs, { Dayjs } from 'dayjs';

export class TimeUtils {
  static isBetwenInclusive(time: Date | string | Dayjs, range: TimeBlock) {
    return (
      !dayjs(time).isBefore(dayjs(range.startTime)) && !dayjs(time).isAfter(dayjs(range.startTime))
    );
  }

  static isWithin(block1: TimeBlock, block2: TimeBlock) {
    return (
      !dayjs(block1.startTime).isBefore(dayjs(block2.startTime)) &&
      !dayjs(block1.endTime).isAfter(dayjs(block2.endTime))
    );
  }

  static blockOverlaps(block1: TimeBlock, block2: TimeBlock) {
    return (
      TimeUtils.isBetwenInclusive(block1.startTime, block2) ||
      TimeUtils.isBetwenInclusive(block1.endTime, block2) ||
      TimeUtils.isWithin(block2, block1)
    );
  }
}
