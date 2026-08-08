import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "store", "gallery.json");

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
  const items: Array<{ id: string }> = readData();
  const idx = items.findIndex((i) => i.id === body.id);
  if (idx !== -1) {
    items[idx] = { ...items[idx], ...body };
  }
  writeData(items);
  return NextResponse.json({ success: true });
}

export async function POST(request: Request) {
  const body = await request.json();
  const items: Array<{ id: string; number: string }> = readData();
  const n = items.length + 1;
  const pad = String(n).padStart(2, "0");
  const newItem = {
    id: Date.now().toString(),
    number: `${pad} / ${String(n).padStart(2, "0")}`,
    ...body,
  };
  items.push(newItem);
  writeData(items);
  return NextResponse.json({ success: true, data: newItem });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  let items: Array<{ id: string }> = readData();
  items = items.filter((i) => i.id !== id);
  writeData(items);
  return NextResponse.json({ success: true });
}
