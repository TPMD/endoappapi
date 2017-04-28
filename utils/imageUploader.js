import knox from 'knox'


const ImageUploader = options => {
  return new Promise((resolve, reject) => {
    let buf = new Buffer(options.data_uri.replace(/^data:image\/\w+;base64,/, ""),'base64');
    const knoxClient = knox.createClient({
      key: process.env.AWS_ACCESS_KEY_ID,
      secret: process.env.AWS_SECRET_ACCESS_KEY,
      bucket: process.env.AWS_BUCKET_NAME
    });
    console.log(knoxClient)
    let putImages = () => {
      return new Promise((resolve, reject) => {
      knoxClient.put('/images/' +options.filename, {
        'Content-Length': buf.length,
         'Content-Type': options.filetype,
         'x-amz-acl': 'public-read' 
       }, (err, res) => {
        if(!!err) {
          console.log('error putting images into aws', err)
        }
        else {
          resolve(res)
        }
       })
    })
    }
    return putImages()
          .then(res => {
            console.log(res)
            resolve(res)
          })

  })

}

export default ImageUploader