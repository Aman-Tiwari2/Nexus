import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { blogs as fallbackBlogs, BlogPost } from "@/data/blogs";

const filePath = path.join(process.cwd(), "data", "store", "blogs.json");

function getBlogs(): BlogPost[] {
  try {
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(fileData);
    }
  } catch (error) {
    console.error("Error reading blogs.json:", error);
  }
  return fallbackBlogs;
}

function saveBlogs(blogsData: BlogPost[]) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, JSON.stringify(blogsData, null, 2), "utf-8");
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const current = getBlogs();

    const index = current.findIndex((b) => b.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    current[index] = {
      ...current[index],
      ...body,
      slug: body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    };

    saveBlogs(current);
    return NextResponse.json({ success: true, blog: current[index] });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const current = getBlogs();

    const filtered = current.filter((b) => b.id !== id);
    saveBlogs(filtered);

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
