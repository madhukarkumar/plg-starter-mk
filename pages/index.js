import Head from 'next/head'
import Image from 'next/image'
import Widget from '../components/widget'
import styles from '../styles/Home.module.css'
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';


// var email = "wworrk"
// var fullName = "worrk"
// var displayName = "wworrk"


export default function Home({token2}) {
  const [token, setToken] = useState(token2);
  const [email, setEmail] = useState("default");
  const [fullName, setFullName] = useState("default");
  const [displayName, setDisplayName] = useState("default");
  async function getSessionTokenForRevUser() {
    // console.log("here")
    // Token endpoint to call for obtaining session token.
    const url = 'https://api.devrev.ai/token'
    // console.log(email)

    // Details of the RevUser.

    // Your Org's Application token which is required for provisioning a RevUser.
    // Keep this a secret
    const appToken = 'eyJhbGciOiJSUzI1NiIsImlzcyI6Imh0dHA6Ly9zdHMuZGV2cmV2LmFpIiwia2lkIjoic3RzX2tpZF9yc2EiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOlsiamFudXMiXSwiZXhwIjoxNjYwMDc2MTM0LCJodHRwOi8vZGV2cmV2LmFpL2NsaWVudGlkIjoiNEdFdVVjIiwiaHR0cDovL2RldnJldi5haS9kZXZvaWQiOiJERVYtQllkNEhLV1IiLCJodHRwOi8vZGV2cmV2LmFpL3N2Y2FjYyI6ImRvbjppZGVudGl0eTpkdnJ2LXVzLTE6ZGV2by9CWWQ0SEtXUjpzdmNhY2MvNEdFdVVjIiwiaHR0cDovL2RldnJldi5haS90b2tlbnR5cGUiOiJ1cm46ZGV2cmV2OnBhcmFtczpvYXV0aDp0b2tlbi10eXBlOmFhdCIsImlhdCI6MTY1NzY1NjkzNCwiaXNzIjoiaHR0cDovL3N0cy5kZXZyZXYuYWkiLCJqdGkiOiJkb246aWRlbnRpdHk6ZHZydi11cy0xOmRldm8vQllkNEhLV1I6dG9rZW4vMTNRb3pKUEt6Iiwic3ViIjoiZG9uOmlkZW50aXR5OmR2cnYtdXMtMTpkZXZvL0JZZDRIS1dSOnN2Y2FjYy80R0V1VWMifQ.e1TfQfRIkQ8DldKeuVCAE3PubePnbdO9bBJROWmvyPttCvidwkHbLvkfVE8p8bV0Kn85F05pJECYv2Pw-0r1bwUWx9Et9jBcZxXxioDkcbHtAlUCwgFB8GxaSsZrzXq9D5vzHYKftS9Iw7LYrCZ57gDSVFv-_DMFhQ9umdmzMINPJFSMIMHqpZTqCu8ZgSt08mFYg6iRTa82FH_VYtJFEAU5AWvXShJgMgI9jAXxmkgnspIPSr-iXOM_m9aheDt80QHE_rr5mV4nPX6qnxvSvG0aEG-WwuKrPHTpwfxHTMxWAsHjBOJX0wpGEExTtCuUTSCTuweqPjYevJFeFs1iPA'

    const headers = {
      'Authorization': appToken
    };
    const response = await axios.post(url, {
      "grant_type": "urn:ietf:params:oauth:grant-type:token-exchange",
      "subject_token": JSON.stringify({ "email": email, "display_name": displayName, "full_name": fullName }),
      "subject_token_type": "urn:devrev:params:oauth:token-type:userinfo",
      "requested_token_type": "urn:devrev:params:oauth:token-type:session"
    }, { headers })
    const sessionToken = response.data["access_token"];
    console.log(sessionToken);
    console.log("updated")
    setToken(sessionToken);
  }




  // console.log(email);
  getSessionTokenForRevUser()

  useEffect(() => {
    console.log("here")
    getSessionTokenForRevUser();
    

  }, [email, fullName, displayName]
  )
  if (Math.random() > 0.001) {
    console.log("here");
  // setEmail("defaultv2")

  }
  // console.log(token);

  // const b = getSessionTokenForRevUser();
  
  // console.log(b);

  // const sessionToken =  getSessionTokenForRevUser();
  // console.log(sessionToken);
  return (
    <div>
      <form>
  <label>
    Full Name:
    <input type="text" name="full full name" />
  </label>
    Email
    <input type="text" name="email"/>
  <label>
  Display Name:
  <input type='text' name ='display name'/>
  </label>
  <input type="submit" value="Submit" />
</form>
<span>{token}</span>
<button>+</button>
      <Widget token={token}></Widget>
    </div>
  )
}



export async function getServerSideProps() {
  const url = 'https://api.devrev.ai/token'

  // Details of the RevUser.

  // Your Org's Application token which is required for provisioning a RevUser.
  // Keep this a secret
  const appToken = 'eyJhbGciOiJSUzI1NiIsImlzcyI6Imh0dHA6Ly9zdHMuZGV2cmV2LmFpIiwia2lkIjoic3RzX2tpZF9yc2EiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOlsiamFudXMiXSwiZXhwIjoxNjYwMDc2MTM0LCJodHRwOi8vZGV2cmV2LmFpL2NsaWVudGlkIjoiNEdFdVVjIiwiaHR0cDovL2RldnJldi5haS9kZXZvaWQiOiJERVYtQllkNEhLV1IiLCJodHRwOi8vZGV2cmV2LmFpL3N2Y2FjYyI6ImRvbjppZGVudGl0eTpkdnJ2LXVzLTE6ZGV2by9CWWQ0SEtXUjpzdmNhY2MvNEdFdVVjIiwiaHR0cDovL2RldnJldi5haS90b2tlbnR5cGUiOiJ1cm46ZGV2cmV2OnBhcmFtczpvYXV0aDp0b2tlbi10eXBlOmFhdCIsImlhdCI6MTY1NzY1NjkzNCwiaXNzIjoiaHR0cDovL3N0cy5kZXZyZXYuYWkiLCJqdGkiOiJkb246aWRlbnRpdHk6ZHZydi11cy0xOmRldm8vQllkNEhLV1I6dG9rZW4vMTNRb3pKUEt6Iiwic3ViIjoiZG9uOmlkZW50aXR5OmR2cnYtdXMtMTpkZXZvL0JZZDRIS1dSOnN2Y2FjYy80R0V1VWMifQ.e1TfQfRIkQ8DldKeuVCAE3PubePnbdO9bBJROWmvyPttCvidwkHbLvkfVE8p8bV0Kn85F05pJECYv2Pw-0r1bwUWx9Et9jBcZxXxioDkcbHtAlUCwgFB8GxaSsZrzXq9D5vzHYKftS9Iw7LYrCZ57gDSVFv-_DMFhQ9umdmzMINPJFSMIMHqpZTqCu8ZgSt08mFYg6iRTa82FH_VYtJFEAU5AWvXShJgMgI9jAXxmkgnspIPSr-iXOM_m9aheDt80QHE_rr5mV4nPX6qnxvSvG0aEG-WwuKrPHTpwfxHTMxWAsHjBOJX0wpGEExTtCuUTSCTuweqPjYevJFeFs1iPA'

  const headers = {
    'Authorization': appToken
  };
  const response = await axios.post(url, {
    "grant_type": "urn:ietf:params:oauth:grant-type:token-exchange",
    "subject_token": JSON.stringify({ "email": "email", "display_name": "displayName", "full_name": "fullName" }),
    "subject_token_type": "urn:devrev:params:oauth:token-type:userinfo",
    "requested_token_type": "urn:devrev:params:oauth:token-type:session"
  }, { headers })
  const sessionToken = response.data["access_token"];
  // console.log(sessionToken);
  return  {
    props : {
      token2 : sessionToken
    }
  }
}