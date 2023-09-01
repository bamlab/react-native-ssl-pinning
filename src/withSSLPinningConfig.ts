import fs from "fs";
import { ConfigPlugin } from "@expo/config-plugins";

export const withSSLPinningConfig: ConfigPlugin<{
  sslConfig: {
    hostName: string;
    certificateSHAFinal: string;
    certificateSHAIntermediate: string;
    certificateSHARoot: string;
  };
}> = (config, { sslConfig }) => {
  const path = "modules/security/android/sslpinning.properties";
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }

  // Create the ssl.properties file from the sslConfig object
  let data = "";
  for (const [key, value] of Object.entries(sslConfig)) {
    data += `${key}=${value}\n`;
  }

  // Write file in a sync way makes pod crashes
  fs.writeFile(path, data, { encoding: "utf8" }, () => {});
  return config;
};
