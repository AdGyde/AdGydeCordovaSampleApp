/*************************************************************************
 *  File: AdGydeTrackerPlugin.java
 * Description : This file initiates calls to the native library from the plugin
 *
 *  Copyright (c) 2019 - AdGyde Solutions Private Limited
 *  All Rights Reserved.
 *
 *  NOTICE:  All information contained herein is, and remains
 *  the property of AdGyde Solutions Private Limited. 
 *  The intellectual and technical concepts contained herein 
 *  are proprietary to AdGyde Solutions Private Limited and 
 *  are considered trade secrets and/or confidential under Law
 *  Dissemination of this information or reproduction of this material,
 *  in whole or in part, is strictly forbidden unless prior written 
 *  permission is obtained from AdGyde Solutions Private Limited.
 *
 */

package com.adgyde.sdk;

import android.content.Context;
import android.util.Log;

import org.apache.cordova.*;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Iterator;

import com.adgyde.android.AdGyde;


public class AdGydeTrackerPlugin extends CordovaPlugin
{
    /**	Log TAG	*/
    private static final String LOGTAG = "AdGydeTrackerPlugin";

    /**	Application context. */
    private Context context;

    //keep reference of current screen name 
    private String currScreenName = null;
    public int revenue;
    private boolean flags;
    private int time;

    /**
     * Initialize the Plugin.
     *
     * @param cordova Cordova interface interface.
     * @param webView Cordova webview interface.
     */
    @Override
    public void initialize(final CordovaInterface cordova, final CordovaWebView webView)
    {
        super.initialize(cordova, webView);
        if (context == null && cordova != null && cordova.getActivity() != null)
        {
            context = cordova.getActivity();
        }
        Log.i(LOGTAG, "Plugin Initialization");
    }

    /*
     * Performs an action within the sdk as defined by the action parameter.
     *
     * @param action to perform.
     * @param args is a list of arguments to pass to the specific action.
     * @param callbackContext to pass to results of the action.
     * @return True if completed and false if unable to complete.
     * @throws JSONException if something went wrong with the arguments.
     */
    @Override
    public boolean execute(final String action, final JSONArray args, final CallbackContext callbackContext)
    {

            if (callbackContext != null) {
                callbackContext.success(getDeeplinking());
            }

        if (action == null || action.length() == 0 || args == null)
        {
            return false;
        }
        Log.i(LOGTAG, "Action is: " + action + " and there are " + args.length() + " args:");

        // Retrieves the sdk version.
        if (action.equals("getVersion"))
        {
            if (callbackContext != null)
            {
                callbackContext.success(getVersion());
            }
            return true;
        }

        // INIT AdGyde
        if (action.equals("initAdGyde") && args.length() == 2)
        {
            return initAdGyde(optString(args, 0), optString(args, 1));
        }

        // Set the current Screen Name
        if (action.equals("setCurrentScreen") && args.length() == 1)
        {
            return setCurrentScreen(optString(args, 0));
        }

        // Remove the current Screen Name
        if (action.equals("removeCurrentScreen") && args.length() == 1)
        {
            return removeCurrentScreen(optString(args, 0));
        }

        // Log the Simple Event
        if (action.equals("eventSimple") && args.length() == 1)
        {
            return eventSimple(optString(args, 0));
        }

        // Log the Counting Event
        if (action.equals("eventCounting") && args.length() == 2)
        {
            return eventCounting(optString(args,0), optMap(args,1));
        }

        // Log the Computing Event
        if (action.equals("eventComputing") && args.length() == 2)
        {
            return  eventComputing(optString(args,0), optMap(args,1));
        }

        if (action.equals("eventDailyUnique") && args.length() == 2)
        {
            return  eventDailyUnique(optString(args,0), optMap(args,1));
        }

        if (action.equals("eventPermanentUnique") && args.length() == 2)
        {
            return  eventPermanentUnique(optString(args,0), optMap(args,1));
        }

        if (action.equals("eventCustomUnique") && args.length() == 3)
        {
            return  eventCustomUnique(optString(args,0), optMap(args,1),optInt(args,2));
        }

        if (action.equals("eventRevenue") && args.length() == 1)
        {
            return  eventRevenue(optInt(args,0));
        }

        if (action.equals("fcmToken")&& args.length() == 1)
        {
            return fcmTokens(optString(args,0));
        }

        if (action.equals("setAge") && args.length() == 3 )
        {
            setAge(optInt(args,0),optInt(args,1),optInt(args,2));
        }else{
            setAge(optInt(args,0));
        }

        if (action.equals("setGender") && args.length() == 1)
        {
            return setGender(optString(args,0));
        }

		  if (action.equals("allowIMEI") && args.length() == 1){
            
            return setIMEI(optBoolean(args,0));
        }

		  if (action.equals("setUserId") && args.length() == 1){

		      return setUserId(optString(args,0));
          }


        Log.i(LOGTAG, "Invalid Action");
        return false;
    }




    private String getDeeplinking(){
        String data="";
        try {
             data=AdGyde.getDeeplinkUri(context);

        }catch (Exception e){
            data=null;

        }
        return data;
    }
    /**
     * @return The sdk version or an empty string if the tracker is not configured.
     */
    private String getVersion()
    {
        // Return Tracker.getVersion();
        return "AdGyde SDK v4.1.2";
    }

    private boolean initAdGyde(final String appKey, final String channel)
    {
        Log.i(LOGTAG, "initAdGyde : appkey- " + appKey + " channel- " + channel);

        AdGyde.init(context, appKey, channel); // Default channel is Organic
        AdGyde.setDebugEnabled(true);

        return true;
    }

    private boolean setCurrentScreen(final String screenName)
    {
        Log.i(LOGTAG, "setCurrentScreen : start");
        // If remove screen was not called before setting new name, remove now
        if (currScreenName != null)
        {
            removeCurrentScreen(currScreenName);
        }

        Log.i(LOGTAG, "setCurrentScreen : Screen Name " + screenName);
        AdGyde.setCurrentScreen(context, screenName);
        currScreenName = screenName;

        return true;
    }

    private boolean removeCurrentScreen(final String screenName)
    {
        Log.i(LOGTAG, "removeCurrentScreen : Screen Name " + screenName);
        AdGyde.removeCurrentScreen(context, "HomeScreen");

        // Clear name from local variable
        currScreenName = null;

        return true;
    }

    private boolean eventSimple(final String eventName)
    {
        Log.i(LOGTAG, "eventSimple :" + eventName);
        AdGyde.onSimpleEvent(eventName);
        return true;
    }

    private boolean eventCounting(final String eventName,  HashMap<String, String> value)
    {
        Log.i(LOGTAG, "eventCounting :" + eventName + " value " + value.toString());
        AdGyde.onCountingEvent(eventName, value);

        return true;
    }

    private boolean eventComputing(final String eventName,  HashMap<String, String> value)
    {
        Log.i(LOGTAG, "EventComputing :" + eventName + " value " + value.toString());
        AdGyde.onComputingEvent(eventName, value);
        return true;
    }

    private boolean eventDailyUnique(final String eventName, final HashMap<String, String> value)
    {
        Log.i(LOGTAG, "DailyUnique :" + eventName + " value " + value.toString());
        AdGyde.onDailyUnique(eventName,value);
        return true;
    }

    private boolean eventPermanentUnique(final String eventName, final HashMap<String, String> value)
    {
        Log.i(LOGTAG, "PermanentUnique :" + eventName + " value " + value.toString());
        AdGyde.onPermanentUnique(eventName,value);
        return true;
    }

    private boolean eventCustomUnique(final String eventName, final HashMap<String, String> value, int time)
    {
        Log.i(LOGTAG, "CustomUnique :" + eventName + " value " + value.toString());
        AdGyde.onCustomUnique(eventName,value,time);
        return true;
    }

    private boolean eventRevenue(int rev)
    {
        Log.i(LOGTAG, "Revenue :" + rev );
        AdGyde.onRevenue(rev);
        return true;
    }

    private boolean fcmTokens(final String token)
    {
        Log.i(LOGTAG, "fcmTokens :" + token);
        AdGyde.onTokenRefresh(token);
        return true;
    }

    private void  setAge(int year, int month, int day){
        Log.i(LOGTAG, "setAge :" + year+month+day);
        AdGyde.setAge(context,year,month,day);
    }

    private void setAge(int age){
        Log.i(LOGTAG, "setAge :" + age);
        AdGyde.setAge(context,age);

    }

    private boolean setGender(String gender){
        Log.i(LOGTAG, "setGender :" + gender);
        AdGyde.setGender(context,gender);
        return true;
    }
	
	  private boolean setIMEI(Boolean bool){
        Log.i(LOGTAG, "setIMEI :" + bool);
        AdGyde.allowPermissionIMEI(context,bool);
        return true;
    }

    private boolean setUserId(String userid) {

        Log.i(LOGTAG, "setUserId :" + userid);
        AdGyde.setClientUserId(userid);
        return true;
    }




    /**
     * Retrieve the string from the index in the array if it exists
     *
     * @param array source array.
     * @param index to retrieve at.
     * @return retrieved string or null if it does not exist.
     */
    private static String optString(final JSONArray array, final int index)
    {
        if (array == null || index >= array.length() || array.isNull(index))
        {
            return null;
        }
        return array.optString(index, null);
    }

    private static boolean optBoolean(final JSONArray array, final int index)
    {
        if (array == null || index >= array.length() || array.isNull(index))
        {
            return false;
        }
        return array.optBoolean(index, false);
    }

    private static int optInt(final JSONArray array, final int index)
    {
        if (array == null || index >= array.length() || array.isNull(index))
        {
            return 0;
        }
        return array.optInt(index, 0);
    }

    /**
     * Retrieve the HashMap from the index in the array if it exists
     *
     * @param array source array.
     * @param index to retrieve at.
     * @return retrieved HashMap or null if it does not exist.
     */
    private static HashMap<String, String> optMap(final JSONArray array, final int index)
    {
        if (array == null || index >= array.length() || array.isNull(index))
        {
            return null;
        }

        JSONObject objectMapJSON = array.optJSONObject(index);
        HashMap<String, String> pairs = new HashMap<String, String>();

        Iterator it = objectMapJSON.keys();
        while (it.hasNext())
        {
            String n = (String) it.next();
            try
            {
                pairs.put(n, objectMapJSON.getString(n));
            }
            catch (JSONException e)
            {
            }
        }
        return pairs;
    }

}
