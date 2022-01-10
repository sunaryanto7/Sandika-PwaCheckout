# Sandika-PwaCheckout for SWIFTPWA MAGENTO ONLY

## Preparation
- Clone Sandika-PwaCheckout from git
- Rename Sandika-PwaCheckout to Sandika
- Place at app/code directory

## Install
- You need to install `NodeJs` to run this code
- run `yarn install` on pwa-checkout and pwa-graphql directory

## Running
- Magento:upgrade
- Magento:di:compile
- Sandika -> pwa-checkout -> `yarn build`
- Magento:static-content:deploy
- Sandika -> pwa-graphql -> `yarn run:development` or `yarn run:production`
