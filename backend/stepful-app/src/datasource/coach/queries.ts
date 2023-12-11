export const getCoachAvailibilityQuery = `SELECT availability_id, coach_id, start_time, end_time, created_date 
                                          FROM coach_availability WHERE coach_id=$1::varchar  AND (
                                            (start_time>=$2 AND start_time<=$3) 
                                            OR (end_time>=$2 AND end_time<=$3) 
                                            OR (start_time<=$2 AND end_time>=$3))
                                         ORDER BY start_time asc;`;

export const getCoachAvailibilityOverlappingQuery = `SELECT availability_id, coach_id, start_time, end_time, created_date 
                                          FROM coach_availability 
                                          WHERE coach_id = $3 AND ((start_time>=$1 AND start_time<=$2) OR
                                                (end_time>=$1 AND end_time<=$2) OR
                                                (start_time<=$1 AND end_time>=$2));`;

export const insertCoachAvailabilityQuery = `INSERT INTO coach_availability
                                          (availability_id, coach_id, start_time, end_time)
                                          VALUES($1,$2,$3,$4);`;

export const updateCoachAvailabilityQuery = `UPDATE coach_availability
                                          SET start_time=$2, end_time=$3
                                          WHERE availability_id=$1;`;

export const deleteAvailabilityQuery = `DELETE FROM coach_availability
                                          WHERE availability_id = $1::varchar;`;

export const insertScheduleBlockQuery = `INSERT INTO coach_schedule
                                        (block_id, coach_id, student_id, start_time, end_time)
                                        VALUES($1,$2,$3,$4,$5);`;

export const getCoachScheduleQueries = `SELECT block_id, coach_id, student_id, start_time, end_time, created_date
                                        FROM coach_schedule WHERE coach_id=$1::varchar AND (
                                          (start_time>=$2 AND start_time<=$3) 
                                          OR (end_time>=$2 AND end_time<=$3) 
                                          OR (start_time<=$2 AND end_time>=$3))
                                       ORDER BY start_time asc;`;

export const getCoachAssignedScores = `SELECT c.block_id, coach_id, student_id, start_time, end_time, s.created_date,s.score,s.notes
                                        FROM coach_schedule c
                                        LEFT JOIN student_scores s ON s.block_id=c.block_id 
                                         WHERE  coach_id=$1::varchar
                                       ORDER BY end_time desc;`;

export const upsertBlockScoreQuery = `INSERT INTO student_scores
                                      (block_id, score, notes)
                                      VALUES($1,$2,$3)
                                      ON CONFLICT (block_id) DO UPDATE 
                                      SET score = EXCLUDED.score, notes = EXCLUDED.notes`;
