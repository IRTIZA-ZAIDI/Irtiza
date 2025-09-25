import { Client } from "@notionhq/client";
import { NotionAPI } from "notion-client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;
const unofficialNotion = new NotionAPI();

export default async function handler(req, res) {
  const { slug } = req.query; // Vercel makes dynamic segments available here
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  if (!slug) return res.status(400).json({ error: "Missing slug" });

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Slug",
        rich_text: { equals: slug },
      },
      page_size: 1,
    });

    if (!response.results.length) {
      return res.status(404).json({ error: "Post not found" });
    }

    const page = response.results[0];
    const props = page.properties || {};

    // get full recordMap (server-side)
    const recordMap = await unofficialNotion.getPage(page.id);

    return res.json({
      id: page.id,
      title: props.Title?.title?.[0]?.plain_text || "Untitled",
      slug: props.Slug?.rich_text?.[0]?.plain_text || "",
      date: props["Publish Date"]?.date?.start || "",
      excerpt: props.Excerpt?.rich_text?.[0]?.plain_text || "",
      readTime: props["Read Time"]?.number ? `${props["Read Time"].number} min read` : "",
      isNew: props.New?.checkbox || false,
      status: props.Status?.select?.name || "Draft",
      recordMap,
    });
  } catch (error) {
    console.error("Post fetch error:", error);
    return res.status(500).json({ error: "Failed to fetch post", details: error?.message || error });
  }
}
