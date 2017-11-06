import { Handler, S3EventRecord, Context, Callback } from "aws-lambda";

import * as AWS from "aws-sdk";
import * as speech from "@google-cloud/speech";

const s3 = new AWS.S3();

export async function createMemo<Handler>(
  event: S3EventRecord,
  context: Context,
  callback: Callback
) {
  return callback(null);
}

const mockEvent = {
  s3: {
    bucket: { name: "cruhl-magic-recordings" },
    object: { key: "2017-11-06T20:46:06.311Z.mp3" }
  }
};

const speechClient = new speech({
  projectId: "cruhl-magic-recordings"
});

(async (callback: (err: string) => void) => {
  const {
    s3: { bucket: { name: bucketName }, object: { key: objectKey } }
  } = mockEvent;

  const { Body: recordingMp3 } = await s3
    .getObject({ Bucket: bucketName, Key: objectKey })
    .promise();

  // const recordingAsFlac = ffmpeg()
  //   .input(recordingMp3)
  //   .inputFormat("mp3")
  //   .noVideo();

  // const response = await speechClient.recognize({
  //   audio: {
  //     content: recordingAsFlac
  //   },
  //   config: {
  //     encoding: "FLAC",
  //     sampleRateHertz: 22050,
  //     languageCode: "en-US"
  //   }
  // });

  // console.log(response);
})(() => {});
