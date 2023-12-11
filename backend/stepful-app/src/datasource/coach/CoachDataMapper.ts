import dayjs from "dayjs";
import { CoachAvailability, ScheduledBlock } from "../../models/types";

export class CoachDataMapper {
  toCoachScheduleBlock(r: any): ScheduledBlock {
    return {
      blockId: r["block_id"],
      coachId: r["coach_id"],
      studentId: r["student_id"],
      endTime: dayjs(r["end_time"]).toISOString(),
      startTime: dayjs(r["start_time"]).toISOString(),
    };
  }
  toCoachAvailability(r: any): CoachAvailability {
    return {
      availabilityId: r["availability_id"],
      coachId: r["coach_id"],
      endTime: dayjs(r["end_time"]).toISOString(),
      startTime: dayjs(r["start_time"]).toISOString(),
    };
  }
}
