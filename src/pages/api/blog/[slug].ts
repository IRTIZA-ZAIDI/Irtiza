// // File: /pages/api/blog/[slug].ts
// import type { NextApiRequest, NextApiResponse } from "next";
// import { Client } from "@notionhq/client";

// const notion = new Client({ auth: process.env.NOTION_API_KEY });
// const DATABASE_ID = process.env.NOTION_BLOG_DATABASE_ID!;

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { slug } = req.query;

//   if (!slug || typeof slug !== "string") {
//     return res.status(400).json({ error: "Missing or invalid slug" });
//   }

//   try {
//     // Query database for page with matching slug
//     const response = await notion.databases.query({
//       database_id: DATABASE_ID,
//       filter: {
//         property: "slug",
//         rich_text: {
//           equals: slug,
//         },
//       },
//     });

//     if (response.results.length === 0) {
//       return res.status(404).json({ error: "Post not found" });
//     }

//     const page = response.results[0];

//     // Extract fields
//     const title = page.properties.title?.type === "title" ? page.properties.title.title[0].plain_text : "";
//     const excerpt = page.properties.excerpt?.type === "rich_text" ? page.properties.excerpt.rich_text[0]?.plain_text || "" : "";
//     const date = page.properties["publish date"]?.type === "date" ? page.properties["publish date"].date?.start : "";
//     const readTime = page.properties.readTime?.type === "number" ? `${page.properties.readTime.number} min read` : "";
//     const content = await getPageContent(page.id); // function to get full HTML content from Notion

//     res.status(200).json({
//       id: page.id,
//       title,
//       excerpt,
//       date,
//       readTime,
//       slug,
//       content,
//     });
//   } catch (err: any) {
//     console.error(err);
//     res.status(500).json({ error: err.message || "Internal server error" });
//   }
// }

// // Helper: get full content as HTML using Notion blocks
// async function getPageContent(pageId: string) {
//   const blocks = await notion.blocks.children.list({ block_id: pageId });
//   let html = "";

//   for (const block of blocks.results) {
//     switch (block.type) {
//       case "paragraph":
//         html += `<p>${block.paragraph.rich_text.map(r => r.plain_text).join("")}</p>`;
//         break;
//       case "heading_1":
//         html += `<h1>${block.heading_1.rich_text.map(r => r.plain_text).join("")}</h1>`;
//         break;
//       case "heading_2":
//         html += `<h2>${block.heading_2.rich_text.map(r => r.plain_text).join("")}</h2>`;
//         break;
//       case "heading_3":
//         html += `<h3>${block.heading_3.rich_text.map(r => r.plain_text).join("")}</h3>`;
//         break;
//       case "code":
//         html += `<pre><code>${block.code.rich_text.map(r => r.plain_text).join("")}</code></pre>`;
//         break;
//       case "image":
//         html += `<img src="${block.image.type === "external" ? block.image.external.url : block.image.file.url}" alt=""/>`;
//         break;
//       // Add more block types as needed
//       default:
//         break;
//     }
//   }

//   return html;
// }
