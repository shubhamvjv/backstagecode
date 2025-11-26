⚠️ Action Required: Manual Infrastructure Provisioning

The automated provisioning step for the Azure Web App was skipped because the necessary action module (terraform:apply or run:script) is not registered in this Backstage environment.

Your infrastructure code and configuration files were successfully created and pushed to the repository.

Next Steps to Launch Your Application

You must perform the following steps locally or in a secure CI/CD runner to provision the Azure resources:

Clone your new repository:

git clone [Your Repository URL]


Navigate to the Terraform directory:

cd [repo-name]/terraform


Authenticate to Azure (if not already logged in):

az login


Initialize Terraform:

terraform init


Apply the infrastructure plan to create the Azure Web App:

terraform apply -auto-approve


Once the Terraform apply is complete, your Azure Web App will be running and waiting for the GitHub Actions deployment to finish publishing your code.