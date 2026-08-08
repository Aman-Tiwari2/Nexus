import initialBlogs from "./store/blogs.json";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  image: string;
  excerpt: string;
  content: string;
}

export const blogs: BlogPost[] = initialBlogs as BlogPost[];
