import express, { Request, Response } from 'express';
import { controllers } from './dependencies';
import { HTTPStatus } from './utils/constants';

export const router = express.Router();

router.post(
  '/coach/:coachId/availability',
  controllers.coach.addAvailability.bind(controllers.coach)
);
router.get(
  '/coach/:coachId/availability',
  controllers.coach.getAvailableTimes.bind(controllers.coach)
);

router.get('/coach/:coachId/schedule', controllers.coach.getUpcomingCalls.bind(controllers.coach));

router.post(
  '/coach/:coachId/schedule',
  controllers.coach.scheduleUpcomingCall.bind(controllers.coach)
);

router.get('/coach/:coachId/score', controllers.coach.getAssignedScores.bind(controllers.coach));

router.put(
  '/coach/:coachId/block/:blockId/score',
  controllers.coach.upsertBlockScore.bind(controllers.coach)
);

router.get('/student/:studentId/score', controllers.student.getScores.bind(controllers.student));
