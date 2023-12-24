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
