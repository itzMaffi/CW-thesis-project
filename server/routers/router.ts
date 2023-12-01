import { Router } from 'express';
import { getSlackMessages } from '../controllers/slackController';
const router = Router();

router.get('/slack-messages', getSlackMessages);

export default router;