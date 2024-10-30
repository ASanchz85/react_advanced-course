# React Advanced Course + TypeScript + Vite

This is the technical coding example to get the React Advanced certificate (31-10-2024) at NTER. The goal is to show your skills while learning and having fun. So, the proposal is to create a serverless chat.

Here you have an example of what you will build ->

The project has been set up using vite, typescript + swc and a custom eslint config file that follows the standardjs convention. You are free to change it and use whatever other rules you like more. You can take a look at them here:

- [Airbnb](https://github.com/airbnb/javascript)
- [Google](https://google.github.io/styleguide/jsguide.html)
- [Standardjs](https://standardjs.com/rules)
- [XO](https://github.com/xojs/xo)

There are many options out there, but the previous ones are the most common ones. Be aware that this is crutial step when collaborating in projects with others developers and should be chosen by consensus.

## ESLint configuration and plugins

For this project I haven't installed any additonal dependency apart from the ones provided by vite. As everything is tailormade based on my own experience. One of my goals is to try to avoid wasting time before starting coding. That's why, I usually copy/paste my own eslint.config.js file (before v9 was released, it was a eslintrc.json file)

If you want to take my settings as yours, feel free to download it:

```sh
curl -o eslint.config.js https://raw.githubusercontent.com/ASanchz85/JS-Utils/main/eslint.config.js
```

## VSCode plugins

Apart from eslint config file, I'm used to working with some vscode plugins:

- *code format and linting*

1. dbaeumer.vscode-eslint
2. usernamehw.errorlens
3. esbenp.prettier-vscode

- *web development*

1. dsznajder.es7-react-js-snippets
2. naumovs.color-highlight
3. SimonSiefke.svg-preview
4. formulahendry.auto-rename-tag
5. formulahendry.auto-close-tag
6. christian-kohler.path-intellisense

- *general purpose*

1. dotenv.dotenv-vscode
2. aaron-bond.better-comments
3. vscode-icons-team.vscode-icons
4. pflannery.vscode-versionlens
5. eamodio.gitlens
6. DavidAnson.vscode-markdownlint
7. ritwickdey.LiveServer
8. rangav.vscode-thunder-client

Although this project uses pure modular css. If you're interested in working with SASS, styledComponents or Tailwind. Here you can find the plugins that I usually get enabled when working in a project with those requirements:

- styled-components.vscode-styled-components
- bradlc.vscode-tailwindcss
- syler.sass-indented
- glenn2223.live-sass

## Vite config custom file

If you take a look at my vite.config.ts file you'll realize that it's slightly different from the usual one. It includes a small optimization to reduce the chunks after transpiling. You can visit [vite website](https://vitejs.dev/config/) to learn more about it.

For a project of this size there's not performance difference at all. But if you have plenty of dependencies in your project, especially when dealing with libraries such as MaterialUI, PrimeReact, ChakraUI and so on. You could find it interesting.

## Folder Structure

I tend to follow a clean pattern with some customization based on my experience of what I feel more comfortable in terms of developing frontends. Feel free to change it. But if you're interested in using it, you can downlaod a custom script that automates it (actually, it automates downloading both vite.config.ts and eslint.config.js files, too)

```sh
git clone https://github.com/ASanchz85/Frontend_CleanArch.git script
```

RTFM to have it working 💪.

## Dependencies

The project has the minimal vite dependencies by default. Together with:

- SupabaseJS
- React-router-dom
- React-icons

## Environment variables

Apart from the clasic .env file, Vite provides with two different kind of environments. ".env.development" and ".env.production" that automatically are selected when typing the command build or dev in your terminal. For doing this project, you'll need basically to type down two variables in your .env file (both of them provided by Supabase when starting your project settings):

```sh
VITE_API_SUPABASE_URL=XXXX
VITE_API_SUPABASE_KEY=XXXX
```

## Serverless Supabase backend and recommendations

As this is a small project, I've decided to use Supabase (a postgreSQL cloud provided) similar to Firebase as a backend and database. Although it has some built-in functionalities to hide most of the vulnarabilities when consuming this kind of servicies from the client-side. You should discard this idea if you want to achieve scalability and fully protection.

For a small-medium project is a good option, but if you want to go ahead, consider having an extra layer of protection using a CDN provided by Cloudfare, for example. [Studying its security layer is a must](https://supabase.com/docs/guides/database/postgres/row-level-security).

### Supabase config

Visit the following link if you are logged in with your NTER account to get a thoroughly explanation of how to start using both, Supabase and Google Cloud Console for the 0Auth. Anyhow don't forget to google what you don't understand and follow the official docs in order to learn how to use their APIs, as well as, getting access to examples of how to implement them. RTFM.

## Execution commands

The following commands scripts are available after cloning and installing dependecies

```sh
git clone path/to/project/name && npm i

```

- *development mode*

```sh
npm run dev

```

- *create build*

```sh
npm run build
```

- *linting check*

```sh
npm run lint
```

- *preview mode (build and show result)*

```sh
npm run preview
```

## Testing

Consider add your own tests... tools like Vitest, jest, cypress can help you with that.

Happy hacking!
