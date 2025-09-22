import express from "express";
import cors from "cors";
import { Client } from "@notionhq/client";
import dotenv from "dotenv";
import { NotionAPI } from "notion-client";

dotenv.config();

const app = express();
app.use(cors());

// Official Notion SDK (for database queries)
const notionClient = new Client({
  auth: process.env.NOTION_API_KEY,
  notionVersion: "2022-06-28",
});

const databaseId = process.env.NOTION_DATABASE_ID;

app.get("/api/blog", async (req, res) => {
  try {
    const response = await notionClient.databases.query({
      database_id: databaseId,
      page_size: 50,
      sorts: [{ property: "Publish Date", direction: "descending" }],
      filter: {
        property: "Status",   
        status: {
          equals: "Published",
        },
      },
    });

    const posts = response.results.map((page) => {
      const props = page.properties;
      const publishDate = props["Publish Date"]?.date?.start || null;
      const readTimeNumber = props["Read Time"]?.number || null;

      return {
        id: page.id,
        title: props.Title?.title?.[0]?.plain_text || "Untitled",
        slug: props.Slug?.rich_text?.[0]?.plain_text || "",
        date: publishDate,
        excerpt: props.Excerpt?.rich_text?.[0]?.plain_text || "",
        readTime: readTimeNumber ? `${readTimeNumber} min read` : "—",
        isNew: props.New?.checkbox || false,
        pageUrl: `https://www.notion.so/${page.id.replace(/-/g, "")}`,
      };
    });

    res.json(posts);
  } catch (error) {
    console.error("Notion fetch error:", error);
    res.status(500).json({ error: "Failed to fetch posts", details: error.body || error });
  }
});


// Fetch single blog post by slug
app.get("/api/blog/:slug", async (req, res) => {
  const { slug } = req.params;

  try {
    // Find the page by slug
    const response = await notionClient.databases.query({
      database_id: databaseId,
      filter: {
        property: "Slug",
        rich_text: { equals: slug },
      },
    });

    if (!response.results.length) {
      return res.status(404).json({ error: "Post not found" });
    }

    const page = response.results[0];
    const props = page.properties;

    // Use unofficial Notion client to get recordMap
    const unofficialNotion = new NotionAPI();
    const recordMap = await unofficialNotion.getPage(page.id);

    res.json({
      id: page.id,
      title: props.Title?.title?.[0]?.plain_text || "Untitled",
      slug: props.Slug?.rich_text?.[0]?.plain_text || "",
      date: props["Publish Date"]?.date?.start || "",
      excerpt: props.Excerpt?.rich_text?.[0]?.plain_text || "",
      readTime: props["Read Time"]?.number
        ? `${props["Read Time"].number} min read`
        : "",
      isNew: props.New?.checkbox || false,
      status: props.Published?.select?.name || "Draft", // fixed property access
      recordMap,
    });
  } catch (error) {
    console.error("Post fetch error:", error);
    res.status(500).json({ error: "Failed to fetch post", details: error.body || error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
