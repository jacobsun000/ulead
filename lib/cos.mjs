import COS from 'cos-nodejs-sdk-v5';
let client;
export function cosCall(method, params) {
  client ??= new COS({ SecretId: process.env.COS_SECRET_ID, SecretKey: process.env.COS_SECRET_KEY });
  return new Promise((resolve, reject) => client[method]({
    Bucket: process.env.COS_BUCKET, Region: process.env.COS_REGION, ...params,
  }, (error, result) => error ? reject(error) : resolve(result)));
}
export function mediaUrl(key) {
  return `https://${process.env.COS_BUCKET}.cos.${process.env.COS_REGION}.myqcloud.com/${key.split('/').map(encodeURIComponent).join('/')}`;
}
