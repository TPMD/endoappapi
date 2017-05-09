import { Router } from 'express'
import AWS from 'aws-sdk'

const router = Router()
const s3Bucket = new AWS.S3( { params: {Bucket: 'endopage-images'} } );
AWS.config.accessKeyId = process.env.AWS_ACCESS_KEY_ID
AWS.config.secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
router.route('/upload')
  .post((req, res) => {
    let buf = new Buffer(req.body.url.replace(/^data:image\/\w+;base64,/, ""),'base64')
    let data = {
      Key: `image-${Math.random()}`,
      Body: buf,
      ContentEncoding: 'base64',
      ContentType: 'image/png'
    };
    s3Bucket.putObject(data, function(err, data){
      if (err) { 
        console.log(err);
        console.log('Error uploading data: ', data); 
      } else {
        console.log('succesfully uploaded the image!');
      }
  });
  })

export default router