import unzip from 'unzip-stream/unzip';
import path from 'path';
import stream from 'stream';
import AWS from 'aws-sdk';

const BUCKET = 'pf-test-zip-bucket';
const extensions = ['.xlsx', '.pdf'];
const s3: AWS.S3 = new AWS.S3({apiVersion: '2006-03-01'});
const params: any = {Bucket: BUCKET, Key: 'zip/test.zip'};

let totalFiles = 0;
let uploadedFiles = 0;

s3.getObject(params).createReadStream()
    .pipe(unzip.Parse())
    .on('entry', (entry: any) => {
      if (extensions.includes(path.extname(entry.path)) &&
      !path.basename(entry.path).startsWith('.')) {
        const {writeStream, promise} = uploadStream({
          Bucket: BUCKET,
          Key: `unzipped/${path.basename(entry.path)}`,
        });

        totalFiles++;
        entry.pipe(writeStream);

        promise.then((data: any) => {
          uploadedFiles++;
          console.log('Upload finished', data);
          if (totalFiles == uploadedFiles) {
            console.log('All Done!!!');
          }
        });
      } else {
        entry.autodrain();
      }
    });

const uploadStream = ({Bucket, Key}) => {
  const pass = new stream.PassThrough();
  return {
    writeStream: pass,
    promise: s3.upload({Bucket, Key, Body: pass}).promise(),
  };
};
