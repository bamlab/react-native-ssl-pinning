package expo.modules.configpluginsslpinning;

import com.appmattus.certificatetransparency.CTInterceptorBuilder;
import com.facebook.react.modules.network.OkHttpClientFactory;
import com.facebook.react.modules.network.OkHttpClientProvider;
import com.facebook.react.modules.network.ReactCookieJarContainer;

import java.util.concurrent.TimeUnit;
import okhttp3.CertificatePinner;
import okhttp3.OkHttpClient;
import okhttp3.Request;

public class SSLPinning : OkHttpClientFactory {
    override fun createNewNetworkModuleClient(): OkHttpClient {

        val hostname = BuildConfig.hostName;

        //Certificates must start with 'sha256/' for android
         val certificatePinner = CertificatePinner.Builder()
            .add(hostname, "sha256/" + BuildConfig.certificateSHAFinal)
            .add(hostname, "sha256/" + BuildConfig.certificateSHAIntermediate)
            .add(hostname, "sha256/" + BuildConfig.certificateSHARoot)
            .build()

        val clientBuilder = OkHttpClientProvider.createClientBuilder()

        //Certificate transparency implemented with addNetworkInterceptor
        return clientBuilder
            .certificatePinner(certificatePinner)
            .cookieJar(ReactCookieJarContainer())
            .addNetworkInterceptor(CTInterceptorBuilder().build())
            .build()
    }

}
