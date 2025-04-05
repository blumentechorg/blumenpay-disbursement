// import { v2 as cloudinary } from "cloudinary";
// import { Readable } from "stream";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export async function POST(req) {
//   try {
//     // Get form data from the NextRequest
//     const formData = await req.formData();
//     const file = formData.get("file");

//     if (!file) {
//       return new Response(JSON.stringify({ error: "No file provided" }), {
//         status: 400,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     // Upload file via Cloudinary's upload_stream API
//     return new Promise((resolve) => {
//       const uploadStream = cloudinary.uploader.upload_stream(
//         (error, result) => {
//           if (error) {
//             return resolve(
//               new Response(JSON.stringify({ error: error.message }), {
//                 status: 500,
//                 headers: { "Content-Type": "application/json" },
//               })
//             );
//           }
//           return resolve(
//             new Response(JSON.stringify({ url: result.secure_url }), {
//               status: 200,
//               headers: { "Content-Type": "application/json" },
//             })
//           );
//         }
//       );

//       // Convert the Blob to an ArrayBuffer, then to a readable stream
//       file
//         .arrayBuffer()
//         .then((buffer) => {
//           const readable = new Readable();
//           readable.push(Buffer.from(buffer));
//           readable.push(null);
//           readable.pipe(uploadStream);
//         })
//         .catch((err) => {
//           resolve(
//             new Response(JSON.stringify({ error: err.message }), {
//               status: 500,
//               headers: { "Content-Type": "application/json" },
//             })
//           );
//         });
//     });
//   } catch (err) {
//     return new Response(JSON.stringify({ error: err.message }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }

// app/api/upload-logo/route.js
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // ensure Node.js runtime so we can use stream

// configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // turn the Blob into a Node Buffer, then into a Readable stream
    const buffer = Buffer.from(await file.arrayBuffer());
    const stream = Readable.from(buffer);

    // upload_stream returns via callback; wrap in a Promise
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "logos" }, // optional: put all logos in a folder
        (err, result) => (err ? reject(err) : resolve(result))
      );
      stream.pipe(uploadStream);
    });

    // return both the URL (for display) and public_id (for later deletion)
    return NextResponse.json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
