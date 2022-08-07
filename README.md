To upload to s3 static bucket for hosting:

Prerequisites:
 - AWS CLI is configured with proper AWS account

$ gatsby build
$ aws s3 sync ./public/ s3://personal-static-website-a/