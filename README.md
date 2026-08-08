# To get started, follow these steps:

### 1. Requirements

- Make installed for shortcuts

- Node 22+ installed

- PNPM installed

### 2. Clone the repository and set the ENV file

```
git clone https://github.com/EMENEC-FINANCE/school-admin.git
```

```
cd school-admin/
```

```
cp .env.example .env
```

### 3. Install dependencies

```
make install
```

### 4. Serve on dev

```
make run
```

The default url is [http://localhost:3000](http://localhost:3000)

# Additional Notes

If you want to scan vulnerabilities(security issues)

```

make scan
```

If you want to build docker image

- `docker-template`: Builds and starts the Docker container for local development.

The default url is [http://localhost:13000](http://localhost:13000)

# Update GitHub Action Secrets for continuous integration(build and package)

Go to this link: [GitHub Action Secrets](https://github.com/EMENEC-FINANCE/school-admin/settings/secrets/actions)

- ------------- On your GitHub Action Secrets page -------------
  - Set Secrets `GHCR_USERNAME` `GHCR_PASSWORD` with the values of your GitHub credentials. `GHCR_PASSWORD` is your personal access token with `write package` permission enabled
  - Set Secrets `ADMIN_ENV_DEV` `ADMIN_ENV_STAGING` `ADMIN_ENV_PROD` with value your .env from development, staging and production.
