To upload to s3 static bucket for hosting:

Prerequisites:

AWS CLI is configured with proper AWS account
$ export AWS_PROFILE=ashiel409
$ npm run build
$ aws s3 sync ./build/ s3://maple-site-us-east-1-dev-origin
