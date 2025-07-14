## Clone repository

```bash
git clone <repository-url>
cd <project-directory>
```

## Install dependencies

```bash
npm install
# or pnpm install
# or yarn install
```

## Developing

Start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Deploying

This project is configured to deploy on Vercel using the `@sveltejs/adapter-vercel` adapter.

To deploy the app to other environments, you may need to install a different adapter. For example, to deploy on Node.js, you would use `@sveltejs/adapter-node`. You can find a list of available adapters in the [SvelteKit documentation](https://svelte.dev/docs/kit/adapters).