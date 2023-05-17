## Overview

Fourth version of Open Labyrinth project.

## Important v0.4.0 Information

- "react-digraph" package was injected in Olab.
- Structure of the project was refactored.

## Launch

Create a `.env` file if not done already (can be sourced from `.env.sample`)

To kick off development of the project:

```bash
npm start
```

To make production build:

```bash
npm build
```

## Environment variables

- `API_URL` - base api url
- `PLAYER_PUBLIC_URL` - base player url
- `PUBLIC_URL` - designer base url. use `/designer` if you plan to run the designer in that folder or web server alias.

These variables should go in `.env` file. You may pass variables inline or exported in your session, just comment those out from your `.env` file.

## Production runbook

Clone your repository and Open the folder

```bash
git clone <remote_url> <branch> <directory_folder> && cd <directory_folder>
```

Run downloading of npm modules

```bash
npm i
```

Run the generating of the production build

```bash
npm run build
```

Copy/move the `*` from `./build` folder to web hosts directory

```bash
cp ./build/* -R /var/www/olab4/
```

So your application will be available by `/var/www/olab4/index.html`

## Releases

In the root placed files `release_<N>.patch` and relative to npm git tag
