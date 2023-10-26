import { NextApiRequest, NextApiResponse } from "next";
import { google } from 'googleapis'
import { NextRequest, NextResponse } from "next/server";

const { client_id, client_secret, redirect_uris } = JSON.parse(
  process.env['GOOGLE_API_CREDENTIALS'] || ''
).web;
const SCOPES = [
  'https://www.googleapis.com/auth/calendar.readonly'
];

const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  })

  return NextResponse.json({authorizeUrl}, { status: 200 });
}

export async function POST(req: NextRequest, res: NextApiResponse) {
  const body = await req.json()
  const response = await oAuth2Client.getToken(body.authorizationCode)

  return NextResponse.json({ tokens: response.tokens }, { status: 200 });
}
