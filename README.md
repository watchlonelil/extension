# extension

movie-web extension, allows providers to work without proxy

## How this will likely work on the app

**On mp4 streaming:**
1. movie-web application will send the following to the extension:
   - full specific URL for streaming URL
   - preferred headers for the streaming URL
2. extension will set rules for the specific URL:
   - CORS headers, allow cross origin
   - Set preferred headers sent by app

**On HLS streaming:**
1. movie-web application will send the following to the extension:
   - hostname for the streaming CDN
   - preferred headers for the streaming CDN
2. extension will set rules for the CDN hostname:
   - CORS headers, allow cross origin
   - Set preferred headers sent by app

**On scraping request:**
1. movie-web application will send the following to the extension:
   - url it will attempt to scrape
   - list of headers it's planning on reading
   - list of headers it should add
2. extension will set rules for the list of URLS:
   - CORS headers, allow cross origin
   - set readable headers in CORS
   - set the headers for sending the request
3. extension will reply with the rule ID
4. movie-web will execute the request
5. movie-web will tell the extension to remove the rule with the rule ID

## How will this work for other domains?
- The popup will allow adding/removing the current tab domain to allowed domains list
- The extension will not listen to any calls from disallowed domains
- movie-web.app is default in the list of allowed domains

## Getting Started

First, run the development server:

```bash
pnpm dev
# or
npm run dev
```

Open your browser and load the appropriate development build. For example, if you are developing for the chrome browser, using manifest v3, use: `build/chrome-mv3-dev`.

You can start editing the popup by modifying `popup.tsx`. It should auto-update as you make changes. To add an options page, simply add a `options.tsx` file to the root of the project, with a react component default exported. Likewise to add a content page, add a `content.ts` file to the root of the project, importing some module and do some logic, then reload the extension on your browser.

For further guidance, [visit our Documentation](https://docs.plasmo.com/)

## Making production build

Run the following:

```bash
pnpm build
# or
npm run build
```

This should create a production bundle for your extension, ready to be zipped and published to the stores.

## Submit to the webstores

The easiest way to deploy your Plasmo extension is to use the built-in [bpp](https://bpp.browser.market) GitHub action. Prior to using this action however, make sure to build your extension and upload the first version to the store to establish the basic credentials. Then, simply follow [this setup instruction](https://docs.plasmo.com/framework/workflows/submit) and you should be on your way for automated submission!
