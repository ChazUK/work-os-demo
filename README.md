# WorkOS Demo

This monorepo contains three applications demonstrating WorkOS integration:

- **Portfolio Web** (Angular) - Frontend application
- **Portfolio API** (NestJS) - Backend API
- **NRLA Web** (Next.js) - Next.js application
- **Safe2 Web** (Laravel) - Laravel application

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js** (v18 or higher recommended)
- **pnpm** - Install via `npm install -g pnpm` or `brew install pnpm`
- **PHP** (v8.1 or higher) - Install via `brew install php`
- **Composer** - Install via `brew install composer`

## Installation

1. Clone the repository
2. Install Node.js dependencies:

   ```bash
   pnpm install
   ```

3. Install PHP dependencies for Laravel app:

   ```bash
   cd apps/safe2-web
   composer install
   cd ../..
   ```

4. Set up environment variables:
   - Copy `.env.example` files to `.env` in each app directory
   - Configure WorkOS credentials and other required variables

## Running the Applications

### Angular & NestJS Apps (Portfolio Web + Portfolio API)

Run both the Angular frontend and NestJS backend:

```bash
pnpm nx run-many -t serve
```

- Portfolio Web (Angular) will be available at: http://portfolio.site (proxied from localhost:4200)
- Portfolio API (NestJS) will be available at: http://portfolio.api (proxied from localhost:4201)

### Next.js App (NRLA Web)

Run the Next.js application:

```bash
pnpm nx dev nrla-web
```

- NRLA Web will be available at: http://nrla.site (proxied from localhost:3000)

### Laravel App (Safe2 Web)

Run the Laravel application:

```bash
cd apps/safe2-web
composer run dev
```

The Laravel app will run on its configured port.

## Development

### Running All Apps

To run all applications simultaneously, open separate terminal windows/tabs:

1. Terminal 1: `pnpm nx run-many -t serve` (Angular + NestJS)
2. Terminal 2: `pnpm nx dev nrla-web` (Next.js)
3. Terminal 3: `cd apps/safe2-web && composer run dev` (Laravel)

### Project Structure

This is an Nx monorepo with the following structure:

- `apps/portfolio-web` - Angular application
- `apps/portfolio-api` - NestJS API
- `apps/nrla-web` - Next.js application
- `apps/safe2-web` - Laravel application
- `libs/types` - Shared TypeScript types

## Troubleshooting

- If nginx fails to start, check for port conflicts: `sudo lsof -i :80`
- Ensure all `.env` files are properly configured with WorkOS credentials
- For Laravel issues, check PHP version: `php -v`
- For Node.js issues, verify pnpm installation: `pnpm -v`
