import { google } from 'googleapis';
import { CalendarEvent } from '@/types/index';

const { client_id, client_secret, redirect_uris } = JSON.parse(
  process.env['GOOGLE_API_CREDENTIALS'] || ''
).web;

const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

export async function getCalendarEvents(accessToken: string): Promise<CalendarEvent[] | undefined> {
  try {

    oAuth2Client.setCredentials({ access_token: accessToken });
    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
    const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: now.toISOString(),
      timeMax: nextWeek.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = response.data.items?.map((event) => ({
      start: event.start?.dateTime,
      end: event.end?.dateTime,
      summary: event.summary || '',
    })) as CalendarEvent[] | undefined;

    if (!events) {
      throw new Error('No events found');
    }

    return events;

  } catch (err) {
    console.log(err);
    return undefined;
  }
}

