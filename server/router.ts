import { Router } from 'express';
import { getSlackMessages } from './controllers/slackController';
import { getCalendarEvents } from './controllers/calendarController';
const router = Router();

router.get('/slack-messages', getSlackMessages);
router.get('/calendar', getCalendarEvents);

export default router;
