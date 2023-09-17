import { NextResponse } from "next/server";

export const AWS_S3_URL =
  "https://adriencarbophotography.s3.eu-west-3.amazonaws.com/";

export async function GET(request: Request) {
  return NextResponse.json({
    photos: [
      { src: AWS_S3_URL + "1.jpeg", width: 1200, height: 800 },
      { src: AWS_S3_URL + "2.jpeg", width: 1200, height: 800 },
      { src: AWS_S3_URL + "3.jpeg", width: 1200, height: 800 },
      { src: AWS_S3_URL + "4.jpeg", width: 1200, height: 800 },
      { src: AWS_S3_URL + "5.jpeg", width: 1200, height: 800 },
      { src: AWS_S3_URL + "6.jpeg", width: 1200, height: 800 },
      { src: AWS_S3_URL + "7.jpeg", width: 1200, height: 800 },
      { src: AWS_S3_URL + "8.jpeg", width: 1200, height: 800 },
      { src: AWS_S3_URL + "9.jpeg", width: 1200, height: 800 },
      { src: AWS_S3_URL + "10.jpeg", width: 1200, height: 800 },
      { src: AWS_S3_URL + "11.jpeg", width: 1200, height: 800 },
      { src: AWS_S3_URL + "12.jpeg", width: 1200, height: 800 },
      { src: AWS_S3_URL + "13.jpeg", width: 1200, height: 800 },
      { src: AWS_S3_URL + "14.jpeg", width: 1200, height: 800 },
    ],
  });
}
