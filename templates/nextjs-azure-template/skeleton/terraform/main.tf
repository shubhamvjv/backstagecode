terraform {
  required_version = ">= 1.0"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.65"
    }
  }
}

provider "azurerm" {
  features {}

  subscription_id = var.subscription_id
  tenant_id       = var.tenant_id
  client_id       = var.client_id
  client_secret   = var.client_secret
}

# -------------------------------------------------------
# 🔍 EXISTING RESOURCE GROUP (Read-Only)
# -------------------------------------------------------
# We use 'data' because the group already exists in Azure.
data "azurerm_resource_group" "rg" {
  name = var.resource_group_name
}

# -------------------------------------------------------
# 📦 STORAGE ACCOUNT
# -------------------------------------------------------
resource "azurerm_storage_account" "sa" {
  # We remove hyphens from the app name because Storage Account names 
  # must be alphanumeric only.
  name                     = "${replace(var.app_service_name, "-", "")}sa"
  
  # 👇 FIXED: Notice the 'data.' prefix here
  resource_group_name      = data.azurerm_resource_group.rg.name
  
  # 👇 FIXED: Notice the 'data.' prefix here
  location                 = data.azurerm_resource_group.rg.location
  
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

# -------------------------------------------------------
# ⚙️ APP SERVICE PLAN (The Server Hardware)
# -------------------------------------------------------
resource "azurerm_service_plan" "plan" {
  name                = "${var.app_service_name}-plan"
  
  # 👇 FIXED: Using data reference
  resource_group_name = data.azurerm_resource_group.rg.name
  location            = data.azurerm_resource_group.rg.location
  
  os_type             = "Linux"
  # F1 is Free tier. Change to B1 or S1 if you need more performance.
  sku_name            = "F1" 
}

# -------------------------------------------------------
# 🌐 WEB APP (The Next.js Application)
# -------------------------------------------------------
resource "azurerm_linux_web_app" "app" {
  name                = var.app_service_name
  
  # 👇 FIXED: Using data reference
  resource_group_name = data.azurerm_resource_group.rg.name
  location            = data.azurerm_resource_group.rg.location
  service_plan_id     = azurerm_service_plan.plan.id

  site_config {
    # This configures the runtime for Next.js (Node)
    application_stack {
      node_version = "20-lts"
    }
    always_on = false # Must be false for F1 (Free) tier
app_command_line = "node server.js"
  }

  app_settings = {
    "WEBSITE_RUN_FROM_PACKAGE" = "1"
  }
}
