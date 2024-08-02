import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  endpoint: process.env.R2_ENDPOINT,
  region: process.env.AWS_REGION,
  s3ForcePathStyle: true,
  signatureVersion: 'v4',
});

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get('file');

  const params = {
    Bucket: process.env.R2_BUCKET_NAME_RECORDINGS,
    Key: file,
    Expires: 60 * 60,
  };

  try {
    const url = s3.getSignedUrl('getObject', params);
    return new Response(JSON.stringify({ url }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
