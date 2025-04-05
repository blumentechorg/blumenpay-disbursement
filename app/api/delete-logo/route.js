// app/api/delete-logo/route.js
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(request) {
  try {
    const { public_id } = await request.json();
    if (!public_id) {
      return NextResponse.json(
        { error: "public_id is required" },
        { status: 400 }
      );
    }
    const result = await cloudinary.uploader.destroy(public_id);
    return NextResponse.json({ result });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
