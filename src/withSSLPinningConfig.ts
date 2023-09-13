const { withGradleProperties } = require("@expo/config-plugins");

const withSSLPinningConfig = (config, sslConfig ) => {
  validateCertificatesAndHostname(
      sslConfig?.certificates,
      sslConfig?.hostName
    );
  const newGraddleProperties: Array<any> = [];
  for (const [key, value] of Object.entries(sslConfig)) {
    newGraddleProperties.push({
      type: "property",
      key: key,
      value: value,
    });
  }

  return withGradleProperties(config, (config) => {
    newGraddleProperties.map((gradleProperty) =>
      config.modResults.push(gradleProperty)
    );

    return config;
  });
};

export default withSSLPinningConfig;

class SSLPinningConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SSLPinningConfigError";
  }
}

const validateCertificatesAndHostname = (
  certificates: string[],
  hostName: string
) => {
  if (!certificates || certificates.length === 0) {
    throw new SSLPinningConfigError(
      'The attribute "certificates" is empty or undefined, please add the fingerprints of your certificates to the plugin inputs :\n' +
        "[\n" +
        "'@bam.tech/react-native-ssl-pinning',\n" +
        "  {\n" +
        '    hostName: "yourhostName",\n' +
        "    certificates: [\n" +
        "      certificateSHAFinal,\n" +
        "      certificateSHAIntermediate,\n" +
        "      certificateSHARoot,\n" +
        "    ],\n" +
        "  },\n" +
        "]"
    );
  }

  if (!hostName || hostName.trim() === "") {
    throw new SSLPinningConfigError(
      'The attribute "hostName" is empty or undefined, please add it to the config inputs :\n' +
        "[\n" +
        "'@bam.tech/react-native-ssl-pinning',\n" +
        "  {\n" +
        '    hostName: "yourhostName",\n' +
        "    certificates: [\n" +
        "      certificateSHAFinal,\n" +
        "      certificateSHAIntermediate,\n" +
        "      certificateSHARoot,\n" +
        "    ],\n" +
        "  },\n" +
        "]"
    );
  }
};

