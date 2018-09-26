
// This is how to upload an image to the AMAZON S3 server I've set up with Nima 
const accessKeyId="AKIAIMQYVPCAYJSQV2AA"
const secretAccessKey="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"

const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

//configuring the AWS environment
AWS.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
  });

var s3 = new AWS.S3();
var filePath = "Headshot.jpg";

//configuring parameters
var params = {
  Bucket: 'eatee',
  Body : fs.createReadStream(filePath),
  Key : "Images/"+Date.now()+"_"+path.basename(filePath)
};

s3.upload(params, function (err, data) {
  //handle error
  if (err) {
    console.log("Error", err);
  }

  //success
  if (data) {
    console.log("Uploaded in:", data.Location);
  }
});
