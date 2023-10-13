# react-native-ssl-pinning

## Overview

This module implements SSL Pinning using an expo-module and an expo-plugin

## Setting up the plugin

1. Add the plugin to your dev dependencies 

   ```bash
   yarn add -D @bam.tech/react-native-ssl-pinning
   ```


1. In your `app.config.ts` file, add the following attributes.

   ```ts
   //Example of host name and certificates with google.com
   const hostName = "google.com";

   //Do not include the 'sha256/' part in certificates
   const certificateSHAFinal = "We74o5ME3USRtL6+B2UhXnwY9FR91QPJMYDtUNk6tEc=";
   const certificateSHAIntermediate = "zCTnfLwLKbS9S2sbp+uFz4KZOocFvXxkV06Ce9O5M2w=";
   const certificateSHARoot = "hxqRlPTu1bMS/0DITB1SSu0vd4u/8l8TjPgfaAp63Gc=";

   const config: ExpoConfig = {
     ios: {
       infoPlist: {
         TSKConfiguration: {
           TSKPinnedDomains: {
             [hostName]: {
               TSKEnforcePinning: true,
               TSKIncludeSubdomains: true,
               TSKPublicKeyHashes: [
                 certificateSHAFinal,
                 certificateSHAIntermediate,
                 certificateSHARoot,
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
          hostName: hostName, 
          certificates: [
            certificateSHAFinal,
            certificateSHAIntermediate,
            certificateSHARoot,
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

- break (change) one or several certificates and see if the connexion with the server is still up when you rebuild the app
- set up a proxy such as Proxyman and check if the connexion fails
