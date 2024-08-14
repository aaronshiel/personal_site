variable "aws_acm_certificate_domain" {
  type        = string
  description = "mapledropmlp.com"
}
variable "env_name" {
  type        = string
  description = "dev"
}
variable "project_name" {
  type        = string
  description = "maple-site"
}
variable "static_site_alias" {
  type        = string
  description = ""
  default = "mapledropmlp.com"
}
variable "site_domain_name" {
  type        = string
  description = ""
  default = "mapledropmlp.com"
}
variable "static_cors_allowed_origins" {
  type        = list(string)
  description = "list of cors allowed origins for static"
  default     = []
}
variable "env_tags" {
  type        = map(string)
  default     = {}
  description = "Additional tags (e.g. `map('BusinessUnit`,`XYZ`)"
}
variable "aws_region" {
  type        = string
  description = ""
  default = "us-east-1"
}
variable "aws_route53_zone_name" {
  type        = string
  description = ""
  default = "mapledropmlp.com"
}