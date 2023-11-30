import { Request, Response } from "express";

export async function getCalendarEvents(req: Request, res: Response){
 res.send('OK')
}