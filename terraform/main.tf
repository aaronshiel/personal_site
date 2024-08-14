provider "aws" {
  region = "us-east-1"
  alias  = "us-east-1"
}
data "aws_acm_certificate" "cdn" {
  provider = aws.us-east-1
  domain   = var.aws_acm_certificate_domain
  statuses = ["ISSUED"]
}
locals {
  namespace = "maple-site"
  static_alias = (
    var.static_site_alias != ""
    ? var.static_site_alias
    : length(split(".", var.site_domain_name)) > 2
    ? "static-${var.site_domain_name}"
    : "static.${var.site_domain_name}"
  )
  static_cors_allowed_origins = (
    length(var.static_cors_allowed_origins) != 0
    ? var.static_cors_allowed_origins
    : [
      var.site_domain_name
    ]
  )
  static_page_asset_aliases = [var.site_domain_name]
}


# the default policy does not include query strings as cache keys
resource "aws_cloudfront_cache_policy" "cdn_s3_cache" {
  name        = "${local.namespace}-cdn-s3-origin-cache-policy"
  min_ttl     = 0
  max_ttl     = 31536000 # 1yr
  default_ttl = 2592000  # 1 month
  parameters_in_cache_key_and_forwarded_to_origin {
    cookies_config {
      cookie_behavior = "none"
    }
    headers_config {
      header_behavior = "none"
    }
    query_strings_config {
      query_string_behavior = "all"
    }
  }
}
resource "aws_cloudfront_origin_request_policy" "cdn_s3_request" {
  name = "${local.namespace}-cdn-s3-origin-request-policy"
  cookies_config {
    cookie_behavior = "none"
  }
  headers_config {
    header_behavior = "none"
  }
  query_strings_config {
    query_string_behavior = "all"
  }
}

# fronts just an s3 bucket with static assets (javascript, css, ...) for frontend apps hosting
module "cdn_static_assets" {
  source                             = "git::https://github.com/cloudposse/terraform-aws-cloudfront-s3-cdn.git?ref=tags/0.82.4"
  acm_certificate_arn                = data.aws_acm_certificate.cdn.arn
  aliases                            = local.static_page_asset_aliases
  allowed_methods                    = ["HEAD", "DELETE", "POST", "GET", "OPTIONS", "PUT", "PATCH"]
  block_origin_public_access_enabled = true # so only CDN can access it
  cached_methods                    = ["GET", "HEAD"]
  cloudfront_access_logging_enabled = false
  compress                          = true
  default_root_object = "index.html"
  dns_alias_enabled   = true
  environment         = var.aws_region
  # cookies are used in graphql right? but seems to work with "none":
  forward_cookies = "none"
  # from the docs: "Amazon S3 returns this index document when requests are made to the root domain or any of the subfolders"
  # if this is the case then aws_lambda_function.cf_fn_origin_root is not required
  index_document      = "index.html"
  ipv6_enabled        = true
  log_expiration_days = 30
  name                = var.env_name
  namespace           = local.namespace
  ordered_cache = [
    {
      target_origin_id                  = "" # default s3 bucket
      path_pattern                      = "*"
      viewer_protocol_policy            = "redirect-to-https"
      min_ttl                           = 0
      default_ttl                       = 2592000  # 1 month
      max_ttl                           = 31536000 # 1yr
      forward_query_string              = false
      forward_cookies                   = "none"
      forward_cookies_whitelisted_names = []
      viewer_protocol_policy      = "redirect-to-https"
      cached_methods              = ["GET", "HEAD"]
      allowed_methods             = ["HEAD", "DELETE", "POST", "GET", "OPTIONS", "PUT", "PATCH"]
      compress                    = true
      forward_header_values       = []
      forward_query_string        = false
      cache_policy_id             = resource.aws_cloudfront_cache_policy.cdn_s3_cache.id
      origin_request_policy_id    = resource.aws_cloudfront_origin_request_policy.cdn_s3_request.id
      lambda_function_association = []
      trusted_signers             = []
      trusted_key_groups          = []
      response_headers_policy_id  = ""
      function_association = []
    }
  ]
  # comment out to create a new bucket:
  # origin_bucket   = ""
  origin_force_destroy = true
  parent_zone_name     = var.aws_route53_zone_name
  # https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/PriceClass.html
  price_class = "PriceClass_100"
  # this are artifacts generated from github code, no need to version them:
  versioning_enabled     = true # test backup
  viewer_protocol_policy = "redirect-to-https"
}
resource "aws_ssm_parameter" "cdn_id" {
  name     = "/maple/CLOUDFRONT_DISTRIBUTION_ID"
  type     = "String"
  value    = module.cdn_static_assets.cf_id
  provider = aws.us-east-1
  tags     = var.env_tags
}
resource "aws_ssm_parameter" "cdn_s3_websites_arn" {
  name        = "/maple/s3-websites/ARN"
  description = "Bucket that stores frontend apps"
  type        = "String"
  value       = module.cdn_static_assets.s3_bucket_arn
  provider    = aws.us-east-1
  tags        = var.env_tags
}
resource "aws_ssm_parameter" "cdn_s3_websites_name" {
  name        = "/maple/s3-websites/NAME"
  description = "Bucket that stores frontend apps"
  type        = "String"
  value       = module.cdn_static_assets.s3_bucket
  provider    = aws.us-east-1
  tags        = var.env_tags
}