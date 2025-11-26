output "resource_group_name" {
  # 👇 FIXED: Added 'data.' prefix
  value = data.azurerm_resource_group.rg.name
}

output "storage_account_name" {
  value = azurerm_storage_account.sa.name
}

output "webapp_name" {
  # This might be needed if you want to see the app URL later
  value = azurerm_linux_web_app.app.default_hostname
}