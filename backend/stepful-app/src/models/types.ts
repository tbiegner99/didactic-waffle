export interface TimeBlock {
  startTime: string;
  endTime: string;
}

export interface CoachAvailability extends TimeBlock {
  availabilityId: string;
  coachId: string;
}

export interface ScheduledBlock extends TimeBlock {
  blockId: string;
  studentId: string;
  coachId: string;
}

export interface CallScore {
  block: ScheduledBlock;
  score: Score;
}

export interface Score {
  blockId: string;
  studentId: string;
  notes: string;
  score: number;
  createdAt: string;
  createdBy: string;
}
