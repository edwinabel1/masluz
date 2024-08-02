import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  endpoint: process.env.R2_ENDPOINT,
  region: process.env.AWS_REGION,
  s3ForcePathStyle: true, // needed with R2
});

export async function GET(request) {
  const params = {
    Bucket: process.env.R2_BUCKET_NAME_RECORDINGS,
  };

  try {
    const data = await s3.listObjectsV2(params).promise();
    const files = data.Contents.map(item => ({
      key: item.Key,
      url: s3.getSignedUrl('getObject', {
        Bucket: process.env.R2_BUCKET_NAME_RECORDINGS,
        Key: item.Key,
        Expires: 60 * 60,
      }),
    }));
    return new Response(JSON.stringify(files), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
