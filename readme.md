# Guide to setting up a project on Storyblok

## Setup

1.  Dev server ssl proxy port setup: Generate ssl cert using mkcert utility and copy it to the root directory

    ```bash
    mkcert localhost
    ```

    also Global install local-ssl-proxy package

    ```bash
    bun i -g local-ssl-proxy
    ```

2.  Setting up the Storyblok Api client:

    Create a new space on storyblok and do the following

    a. Go to space settings and find the region where your storyblok data is hosted, this is crucial in setting up the storyblok client.

    [More about storyblok server regions](https://www.storyblok.com/faq/define-specific-region-storyblok-api)

    <blockquote>
    Depending on whether your space was created in the EU, the US, Australia, Canada, or China, you may need to set the region parameter of the API accordingly:
        
        eu (default): For spaces created in the EU
        us: For spaces created in the US
        ap: For spaces created in Australia
        ca: For spaces created in Canada
        cn: For spaces created in China
    </blockquote>

    Add this region code to .env file under the environment variable STORYBLOK_REGION

    b. Add the access_token to .env file:
    In the env file add an env variable by the name STORYBLOK_ACCESS_TOKEN which is the access token to the api of your storyblok space that you can find in the settings of your space.
