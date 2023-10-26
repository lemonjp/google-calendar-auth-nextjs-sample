import { NextApiRequest, NextApiResponse } from "next";
import { google } from 'googleapis'
import { NextRequest, NextResponse } from "next/server";

// .env 環境変数から GCPで取得した credential.json の情報を取得
const { client_id, client_secret, redirect_uris } = JSON.parse(
  process.env['GOOGLE_API_CREDENTIALS'] || ''
).web;
// スコープ（範囲）を指定
const SCOPES = [
  'https://www.googleapis.com/auth/calendar.readonly'
];
// OAuth2 クライアントオブジェクト作成
const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  // OAuth2クライアントからスコープを指定してURLを取得
  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  })

  return NextResponse.json({authorizeUrl}, { status: 200 });
}

export async function POST(req: NextRequest, res: NextApiResponse) {
  const body = await req.json()
  // OAuth2クライントに認可コードをセットしてやるとアクセストークンを得ることができる
  const response = await oAuth2Client.getToken(body.authorizationCode)

  return NextResponse.json({ tokens: response.tokens }, { status: 200 });
}
