import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN
});

export default async function handler(req, res) {

  if (req.method === "GET") {

    const note = await redis.get("shared_note");

    res.status(200).json({
      note: note || ""
    });

    return;
  }

  if (req.method === "POST") {

    await redis.set("shared_note", req.body.note);

    res.status(200).json({
      success: true
    });

    return;
  }

  res.status(405).end();
}