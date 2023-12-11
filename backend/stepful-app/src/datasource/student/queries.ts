export const getScoresForStudentQuery = `SELECT c.block_id, coach_id, student_id, start_time, end_time,score,notes, s.created_date
                                        FROM coach_schedule c, student_scores s WHERE s.block_id=c.block_id AND student_id=$1::varchar
                                       ORDER BY start_time asc;`;
