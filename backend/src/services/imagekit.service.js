const ImageKit = require('imagekit')

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
  publicKey:process.env.IMAGEKIT_PUBLIC_KEY,
  urlEndpoint:process.env.IMAGEKIT_URL_ENDPOINT
});

async function imageUpload(buffer) {
  const data = await client.upload({
  file: buffer.toString('base64'),
  fileName: 'file-name.jpg',
  folder : 'placement_manager/student_dashboard'
});
return data
}

module.exports = {imageUpload}
