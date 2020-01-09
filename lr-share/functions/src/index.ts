// import * as functions from 'firebase-functions'

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

// export const helloWorld = functions.https.onRequest((request, response) => {
//   response.send('Hello from Firebase!')
// })

const functions = require('firebase-functions')
const express = require('express')
const app = express()
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)

const db = admin.firestore()

let projectId: string, keyFilename: string, bucketName: string

// Firebaseのproject ID
projectId = '<FILL ME>'
keyFilename = 'privateKey.json'

// OGPが保存されてるCloudStorageのバケット
bucketName = '<FILL ME>'

async function generateSignedUrl(bucketName: string, filename: string) {
  // [START storage_generate_signed_url]
  // Imports the Google Cloud client library
  const { Storage } = require('@google-cloud/storage')

  // Creates a client
  const storage = new Storage({
    projectId,
    keyFilename
  })

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const bucketName = 'Name of a bucket, e.g. my-bucket';
  // const filename = 'File to access, e.g. file.txt';

  // These options will allow temporary read access to the file
  const options = {
    action: 'read',
    expires: Date.now() + 1000 * 60 * 60 * 24 * 30 // 1month
  }

  // Get a signed URL for the file
  const [url] = await storage
    .bucket(bucketName)
    .file(filename)
    .getSignedUrl(options)

  console.log(`The signed url for ${filename} is ${url}.`)
  // [END storage_generate_signed_url]
  return url
}

const site_name = 'Qiita'
const title = 'Qiita'
const meta_description = 'プログラミング情報共有サイトです。'
const meta_keywords = ['プログラミング']
const og_description = 'プログラミング情報共有サイトです。'
const og_image_width = 1200
const og_image_height = 630
const fb_appid = ''
const tw_description = 'プログラミング情報共有サイトです。'
const tw_site = ''
const tw_creator = ''

const genHtml = (url: string) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>${title}</title>
    <meta name="description" content=${meta_description}>
    <meta name="keywords" content=${meta_keywords.join(',')}>
    <meta property="og:locale" content="ja_JP">
    <meta property="og:type" content="website">
    <meta property="og:url" content=${url}>
    <meta property="og:title" content=${title}>
    <meta property="og:site_name" content=${site_name}>
    <meta property="og:description" content=${og_description}>
    <meta property="og:image" content=${url}>
    <meta property="og:image:width" content=${og_image_width}>
    <meta property="og:image:height" content=${og_image_height}>
    <meta property="fb:app_id" content=${fb_appid}>
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content=${title}>
    <meta name="twitter:description" content=${tw_description}>
    <meta name="twitter:image" content=${url}>
    <meta name="twitter:site" content=${tw_site}>
    <meta name="twitter:creator" content=${tw_creator}>
  </head>
  <body>
    <script>
      // クローラーにはメタタグを解釈させて、人間は任意のページに飛ばす
      location.href = '/share';
    </script>
  </body>
</html>
`

app.get('/:id', async (req: any, res: any) => {
  const doc = await db
    .collection('cards')
    .doc(req.params.id)
    .get()
  if (!doc.exists) {
    console.log(`${req.params.id} not exist`)
    res.status(404).send('404 Not Exist')
  } else {
    // const url = await generateSignedUrl(bucketName, `${req.params.id}.png`)
    // const html = genHtml(url)
    res.set('cache-control', 'public, max-age=3600')
    res.send(`id: ${req.params.id}`)
  }
})

exports.s = functions.https.onRequest(app)
