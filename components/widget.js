import Script from "next/script";

export default function Widget({token}) {
  return (
          <Script
           id="devrev_plug"
           onLoad={async () => {
             try {
               const sessionToken = token
               const sdkObject = new window.DevRevSupportSdk({
                 sessionToken,
               });
               setSupportSdk(sdkObject);
             } catch (error) {
               console.log(error);
             }
           }}
           src={"https://plug.devrev.ai/nextplug/widget.js"}
 />
)
}