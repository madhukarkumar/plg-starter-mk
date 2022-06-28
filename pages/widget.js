import Script from "next/script";


export default function Widget() {
    
  return (
          <Script
           id="devrev_plug"
           onLoad={async () => {
             try {
              //  const tokenResponse = await getSupportWidgetToken(accessToken);
              //  const sessionToken = tokenResponse.access_token; need to add functionality later
               const sessionToken = "eyJhbGciOiJSUzI1NiIsImlzcyI6Imh0dHA6Ly9zdHMuZGV2cmV2LmFpIiwia2lkIjoic3RzX2tpZF9yc2EiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOlsiamFudXMiXSwiZXhwIjoxNjU4Nzc3NDc4LCJodHRwOi8vZGV2cmV2LmFpL2Rldm9pZCI6IkRFVi1rNWwwR29MbyIsImh0dHA6Ly9kZXZyZXYuYWkvZGlzcGxheW5hbWUiOiJBbWFuIiwiaHR0cDovL2RldnJldi5haS9lbWFpbCI6ImFtYW5AZ21haWwuY29tIiwiaHR0cDovL2RldnJldi5haS9mdWxsbmFtZSI6IkFtYW4gU2luZ2giLCJodHRwOi8vZGV2cmV2LmFpL3Jldm9pZCI6IlJFVi0xIiwiaHR0cDovL2RldnJldi5haS9yZXZ1aWQiOiJSRVZVLTIiLCJodHRwOi8vZGV2cmV2LmFpL3Rva2VudHlwZSI6InVybjpkZXZyZXY6cGFyYW1zOm9hdXRoOnRva2VuLXR5cGU6c2Vzc2lvbiIsImlhdCI6MTY1NjM1ODI3OCwiaXNzIjoiaHR0cDovL3N0cy5kZXZyZXYuYWkiLCJqdGkiOiJkb246aWRlbnRpdHk6ZHZydi11cy0xOmRldm8vazVsMEdvTG86dG9rZW4vQTFQTVBReFoiLCJzdWIiOiJkb246aWRlbnRpdHk6ZHZydi11cy0xOmRldm8vazVsMEdvTG86cmV2by8xOnJldnUvMiJ9.Y08j95F7-7bsqPerdaAwFgQ3cAnnpvl95sJSBV9LvYFC3YmOXc7xtZzAwHopxqU9IawXzmhZL9YR_aTpnmBZVwM1peFsQDe3aJmtN1ZpHbTJ67HZU9i-U198gPK2Y4fSxIrjXlGCuK_ypzry62NdLpKcngWz2-s4cUPXmpww4NSbzSc5q_C4Bpaw86EMbxhuLA497dCupXJjo8XDHLzE9Aro06qxu62M9eqs6DI5BnaY8FCv-EHHDClNQsfqLekuK_rCR26_KhwYdxYSr8d8xLnRmKFvwIabh2wncdw9wOhXBKkpFdAhxR8xA1UTTsppyN9wcKKug1CnvdsZ407ibw"
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