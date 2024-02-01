# extension

Enhance your movie-web experience with just one click

## Running for development

We use pnpm with the latest version of NodeJS.

```sh
pnpm i
pnpm dev
```

## About permissions

The extension uses the following base permission:
 - `activeTab` - This only gives access to knowing what tab is currently active, in this case we use it for making the on/off button per site on the popout. **This does not allow us to know the content of the site active tab** and because of that, this is not something that is prompted or shown to users.
 - `declarativeNetRequestWithHostAccess` - This allows us to do network request manipulation, but only for sites we have host access for. **This only gives us access after the user has had to accept permission prompt** and because of that, this is not something that is prompted or shown to users.
 - `scripting` - This allows us to inject helper scripts, but only for sites we have host access for. **This only gives us access after the user has had to accept permission prompt** and because of that, this is not something that is prompted or shown to users.
 - `storage` - We need to store which sites are enabled or disabled by the user. This poses no risks to users so this is not something that is prompted or shown to users.

On top of this list, we get the ability to **request** access for the following origins:
 - `https://*/*`
 - `http://*/*`

This means we can request permissions for all possible sites. This is only a prompt where the browser asks if the extension can access a site, this does not give us access without the user knowing.

Once a user has requested to enable the extension for a site. It will inject a helper script so the site knows how to communicate with the extension. Then the extension will do the work that a normal site wouldn't be able to do (like making cross-origin requests or sending headers that are normally restricted). The helper script will be injected everytime they open that site.
