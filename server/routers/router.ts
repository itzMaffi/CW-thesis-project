import { Router } from 'express';
import { getSlackMessages } from '../controllers/slackController';
import { getCalendarEvents } from '../controllers/calendarController';
import { dbread } from '../controllers/dbController';

const router = Router();

router.get('/slack-messages', getSlackMessages);
router.get('/calendar', getCalendarEvents);
router.get('/dbread', dbread); // test the db, can be removed later on, gets entries from db

export default router;
