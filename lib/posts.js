// lib/posts.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get the id
    const id = fileName.replace(/\.md$/, '');

    // Read Markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Get the first image from the post content if exists
    const imageMatch = matterResult.content.match(/!\[.*?\]\((.*?)\)/);
    const image = imageMatch ? imageMatch[1] : null;

    // Add excerpt
    const excerptLength = 150;
    let excerpt = matterResult.content
      .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
      .replace(/\[.*?\]\(.*?\)/g, '$1') // Replace links with just text
      .replace(/#{1,6}\s+/g, '') // Remove headings
      .replace(/\n/g, ' ') // Replace newlines with spaces
      .trim()
      .slice(0, excerptLength);

    if (matterResult.content.length > excerptLength) {
      excerpt += '...';
    }

    // Combine the data with the id
    return {
      id,
      excerpt,
      image,
      ...matterResult.data,
    };
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// This is a server-side function only
export function searchPosts(query, allPosts) {
  if (!query) return allPosts;
  
  const lowerCaseQuery = query.toLowerCase();
  return allPosts.filter(post => {
    return (
      post.title.toLowerCase().includes(lowerCaseQuery) ||
      post.excerpt.toLowerCase().includes(lowerCaseQuery) ||
      (post.tags && post.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery)))
    );
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  // Returns an array that looks like this:
  // [
  //   { params: { id: 'my-first-post' } },
  //   { params: { id: 'my-second-post' } },
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Extract the image URL using regex
  const imageMatch = matterResult.content.match(/!\[.*?\]\((.*?)\)/);
  const imageUrl = imageMatch ? imageMatch[1] : null; // Get the URL or null if not found

  // Convert to absolute URL if imageUrl exists
  const baseUrl = 'https://contrasentido.ar'; // Replace with your actual base URL
  const absoluteImageUrl = imageUrl ? new URL(imageUrl, baseUrl).href : null;

  // Extract the excerpt
  const excerptLength = 150;
  let excerpt = matterResult.content
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[.*?\]\(.*?\)/g, '$1') // Replace links with just text
    .replace(/#{1,6}\s+/g, '') // Remove headings
    .replace(/\n/g, ' ') // Replace newlines with spaces
    .trim()
    .slice(0, excerptLength);

  if (matterResult.content.length > excerptLength) {
    excerpt += '...';
  }

  // Use remark to convert Markdown into HTML string
  const remark = (await import('remark')).remark;
  const html = (await import('remark-html')).default;

  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id, contentHtml, absolute image URL, and excerpt
  return {
    id,
    contentHtml,
    image: absoluteImageUrl, // Use the absolute image URL
    excerpt, // Add the excerpt to the returned object
    ...matterResult.data,
  };
}