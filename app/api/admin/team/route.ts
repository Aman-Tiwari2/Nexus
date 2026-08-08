import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "store", "team.json");

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
  const members: Array<{ id: string }> = readData();
  const idx = members.findIndex((m) => m.id === body.id);
  if (idx !== -1) {
    members[idx] = { ...members[idx], ...body };
  }
  writeData(members);
  return NextResponse.json({ success: true });
}

export async function POST(request: Request) {
  const body = await request.json();
  const members: Array<{ id: string }> = readData();
  const newMember = {
    id: Date.now().toString(),
    slug: body.name
      ? body.name.toLowerCase().replace(/\s+/g, "-")
      : Date.now().toString(),
    skills: [],
    projects: [],
    achievements: [],
    social: {},
    ...body,
  };
  members.push(newMember);
  writeData(members);
  return NextResponse.json({ success: true, data: newMember });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  let members: Array<{ id: string }> = readData();
  members = members.filter((m) => m.id !== id);
  writeData(members);
  return NextResponse.json({ success: true });
}
