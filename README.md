# react-native-ssl-pinning

## Overview

This module implements SSL Pinning using an expo-module and an expo-plugin

## Setting up the plugin

1. Add the plugin to your dev dependencies 

   ```bash
   yarn add -D @bam.tech/react-native-ssl-pinning
   ```


1. In your `app.config.ts` file, add the following attributes

   ```ts
   // Selection of your current environment
   const scheme = schemeConfig.firstEnv;

   const config: ExpoConfig = {
     ios: {
       infoPlist: {
         TSKConfiguration: {
           TSKPinnedDomains: {
             [scheme.hostName]: {
               TSKEnforcePinning: true,
               TSKIncludeSubdomains: true,
               TSKPublicKeyHashes: [
                 scheme.certificateSHAFinal,
                 scheme.certificateSHAIntermediate,
                 scheme..certificateSHARoot,
               ],
             },
           },
           TSKSwizzleNetworkDelegates: true,
         },
       },
     },
     plugins: [
       [
         '@bam.tech/react-native-ssl-pinning',
         {
          hostName: scheme.hostName,
          certificates: [
            scheme.certificateSHAFinal,
            scheme.certificateSHAIntermediate,
            scheme.certificateSHARoot,
            ],
         },
       ],
     ],
   };

   module.exports = config;
   ```


## Using the plugin

1. To use the plugin, run the following commands:

```bash
  npx expo prebuild --clean
```

1. It generates the configuration file for our plugin, then run  

```bash
  npx pod-install
```

1. You might need to clean your caches. If required, run :

```bash
    rm -rf ~/Library/Developer/Xcode/DerivedData
```

## Testing the plugin
1. To test if SSL Pinning is working, you can: 

- break one or several certificates and see if the connexion with the server is still up when you rebuild the app
- set up a proxy such as Proxyman and check if the connexion fails
