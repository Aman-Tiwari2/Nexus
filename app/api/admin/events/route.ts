import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "store", "events.json");

function readData() {
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
}

function writeData(data: unknown) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET() {
  return NextResponse.json(readData());
}

export async function PUT(request: Request) {
  const body = await request.json();
  const data = readData();

  if (body.type === "upcoming") {
    data.upcoming = { ...data.upcoming, ...body.data };
  } else if (body.type === "past") {
    const idx = data.past.findIndex((e: { id: string }) => e.id === body.data.id);
    if (idx !== -1) {
      data.past[idx] = { ...data.past[idx], ...body.data };
    }
  }

  writeData(data);
  return NextResponse.json({ success: true, data });
}

export async function POST(request: Request) {
  const body = await request.json();
  const data = readData();

  // Add new past event
  const newEvent = {
    id: Date.now().toString(),
    ...body,
  };
  data.past.push(newEvent);
  writeData(data);
  return NextResponse.json({ success: true, data: newEvent });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const data = readData();
  data.past = data.past.filter((e: { id: string }) => e.id !== id);
  writeData(data);
  return NextResponse.json({ success: true });
}
