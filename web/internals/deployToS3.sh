# Enable printing executed commands
set x

# Get S3 Bucket and CloudFront Id from environment variables or write it down statically
s3_bucket=$S3_BUCKET_NAME
cf_id=$CLOUDFRONT_ID

echo S3_Bucket: $s3_bucket
echo CloudFront Distribution: $cf_id


if [ -z "$s3_bucket" ]; then
  echo S3_BUCKET not found
  exit
fi

echo Synching Dist Folder: $s3_bucket...
aws s3 sync dist/ s3://$s3_bucket --delete --cache-control max-age=86400,public

echo Adjusting cache...
# aws s3 cp s3://$s3_bucket/sw.js s3://$s3_bucket/sw.js --metadata-directive REPLACE --cache-control max-age=0,no-cache,no-store,must-revalidate --content-type application/javascript --acl public-read
aws s3 cp s3://$s3_bucket/index.html s3://$s3_bucket/index.html --metadata-directive REPLACE --cache-control max-age=0,no-cache,no-store,must-revalidate --content-type text/html

if [ ! -z "$cf_id" ]; then
    echo Invalidating cloudfront cache
    aws cloudfront create-invalidation --distribution-id $cf_id --paths "/*" --no-cli-pager
fi
