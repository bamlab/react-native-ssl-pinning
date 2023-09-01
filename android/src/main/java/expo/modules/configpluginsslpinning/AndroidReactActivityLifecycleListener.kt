package expo.modules.configpluginsslpinning

import android.app.Activity
import android.view.WindowManager
import android.os.Bundle
import expo.modules.core.interfaces.ReactActivityLifecycleListener

import com.facebook.react.modules.network.OkHttpClientProvider;
import okhttp3.OkHttpClient;

class AndroidReactActivityLifecycleListener : ReactActivityLifecycleListener {

  //Setup screenshot prevention when app is unfocused 
  override fun onResume(activity: Activity) {
    super.onResume(activity)
    activity.getWindow().clearFlags(WindowManager.LayoutParams.FLAG_SECURE);
  }

  //Setup screenshot prevention when app is unfocused 
  override fun onPause(activity: Activity) {
    super.onPause(activity)
    activity.getWindow().setFlags(WindowManager.LayoutParams.FLAG_SECURE, WindowManager.LayoutParams.FLAG_SECURE);
  }
  
  //Setup of SSLPinning and Certificate Transparency
  override fun onCreate(activity: Activity, savedInstanceState: Bundle?) {
    super.onCreate(activity, savedInstanceState)
    OkHttpClientProvider.setOkHttpClientFactory(SSLPinning())
  }
  
}
