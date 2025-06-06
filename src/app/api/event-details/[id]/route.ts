// src/app/api/event-details/[id]/route.ts

import { NextResponse } from 'next/server';

export async function GET(request: Request, context) {
  const id = context.params.id as string;
  const API_KEY = process.env.TICKETMASTER_API_KEY;
  const url = `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${API_KEY}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch event' }, { status: 500 });
  }
}
