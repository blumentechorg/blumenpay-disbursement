// // // app/api/upload-logo/route.js
// // import { v2 as cloudinary } from "cloudinary";
// // import formidable from "formidable";

// // cloudinary.config({
// //   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// //   api_key: process.env.CLOUDINARY_API_KEY,
// //   api_secret: process.env.CLOUDINARY_API_SECRET,
// // });

// // // Since Next.js app directory uses a different API, export POST handler
// // export async function POST(req) {
// //   return new Promise((resolve, reject) => {
// //     const form = new formidable.IncomingForm();
// //     form.parse(req, async (err, fields, files) => {
// //       if (err) {
// //         return resolve(
// //           new Response(JSON.stringify({ error: "Error parsing form data" }), {
// //             status: 500,
// //           })
// //         );
// //       }
// //       try {
// //         const file = files.file;
// //         const result = await cloudinary.uploader.upload(file.filepath);
// //         return resolve(
// //           new Response(JSON.stringify({ url: result.secure_url }), {
// //             status: 200,
// //             headers: { "Content-Type": "application/json" },
// //           })
// //         );
// //       } catch (error) {
// //         return resolve(
// //           new Response(JSON.stringify({ error: error.message }), {
// //             status: 500,
// //           })
// //         );
// //       }
// //     });
// //   });
// // }

// // app/api/upload-logo/route.js
// import { v2 as cloudinary } from "cloudinary";
// import formidable from "formidable";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export async function POST(req) {
//   return new Promise((resolve, reject) => {
//     // Use formidable as a function (not as a constructor)
//     const form = formidable({ multiples: false });
//     form.parse(req, async (err, fields, files) => {
//       if (err) {
//         return resolve(
//           new Response(JSON.stringify({ error: "Error parsing form data" }), {
//             status: 500,
//             headers: { "Content-Type": "application/json" },
//           })
//         );
//       }
//       try {
//         const file = files.file;
//         const result = await cloudinary.uploader.upload(file.filepath);
//         return resolve(
//           new Response(JSON.stringify({ url: result.secure_url }), {
//             status: 200,
//             headers: { "Content-Type": "application/json" },
//           })
//         );
//       } catch (error) {
//         return resolve(
//           new Response(JSON.stringify({ error: error.message }), {
//             status: 500,
//             headers: { "Content-Type": "application/json" },
//           })
//         );
//       }
//     });
//   });
// }

// app/api/upload-logo/route.js
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    // Get form data from the NextRequest
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return new Response(JSON.stringify({ error: "No file provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Upload file via Cloudinary's upload_stream API
    return new Promise((resolve) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) {
            return resolve(
              new Response(JSON.stringify({ error: error.message }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
              })
            );
          }
          return resolve(
            new Response(JSON.stringify({ url: result.secure_url }), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            })
          );
        }
      );

      // Convert the Blob to an ArrayBuffer, then to a readable stream
      file
        .arrayBuffer()
        .then((buffer) => {
          const readable = new Readable();
          readable.push(Buffer.from(buffer));
          readable.push(null);
          readable.pipe(uploadStream);
        })
        .catch((err) => {
          resolve(
            new Response(JSON.stringify({ error: err.message }), {
              status: 500,
              headers: { "Content-Type": "application/json" },
            })
          );
        });
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
