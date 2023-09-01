"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withSSLPinningConfig = void 0;
const fs_1 = __importDefault(require("fs"));
const withSSLPinningConfig = (config, { sslConfig }) => {
    const path = "modules/security/android/sslpinning.properties";
    if (fs_1.default.existsSync(path)) {
        fs_1.default.unlinkSync(path);
    }
    // Create the ssl.properties file from the sslConfig object
    let data = "";
    for (const [key, value] of Object.entries(sslConfig)) {
        data += `${key}=${value}\n`;
    }
    // Write file in a sync way makes pod crashes
    fs_1.default.writeFile(path, data, { encoding: "utf8" }, () => { });
    return config;
};
exports.withSSLPinningConfig = withSSLPinningConfig;
//# sourceMappingURL=withSSLPinningConfig.js.map