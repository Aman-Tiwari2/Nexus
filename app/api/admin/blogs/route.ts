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

export async function GET() {
  const data = getBlogs();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const current = getBlogs();

    const newBlog: BlogPost = {
      id: Date.now().toString(),
      slug: body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      title: body.title || "Untitled Blog",
      category: body.category || "Tech News",
      date: body.date || new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      readTime: body.readTime || "5 min read",
      author: body.author || "Nexus Tech Team",
      authorRole: body.authorRole || "Contributor",
      image: body.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
      excerpt: body.excerpt || "",
      content: body.content || "",
    };

    const updated = [newBlog, ...current];
    saveBlogs(updated);

    return NextResponse.json({ success: true, blog: newBlog });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
