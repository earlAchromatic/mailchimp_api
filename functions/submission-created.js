
const fetch = require('node-fetch');
const base64 = require('base-64');
// import fetch from 'node-fetch';
// import { encode } from 'base-64';


exports.handler = async (event) =>{

  // Only allow POST
  if (event.httpMethod !== 'POST') { 
    console.log(`statusCode: 405, body: Method Not Allowed`)
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const errorGen = msg => {
    console.log(`statusCode: 500, body: ${msg}`)
    return { statusCode: 500, body: msg }; 
  };

  try{
    const {email} = JSON.parse(event.body).payload.email;

    if(!email){
      console.log(email)
      return errorGen('Missing Email')
    }''

    const subscriber = {
      email_address: email,
      status: 'subscribed'
    };

    const credentials = `any:${process.env.MC_API}`
    //const credentials = `any: ${MC_API}`

    const response = await
    fetch(`https://${process.env.MC_SERVER}.api.mailchimp.com/3.0/lists/${process.env.LIST_ID}/members/`, {
      method: 'POST',
      headers: { 
        Accept: '*/*', 
        'Content-Type': 'application/json', 
        Authorization: `Basic ${base64.encode(credentials)}`},
        body: JSON.stringify(subscriber)
    });

    const data = await response.json();

    if (!response.ok){
      console.log(`statusCode: ${data.status}, body: ${data.detail}`)
      return {statusCode: data.status, body: data.detail}
    }

    return {statusCode: 200, 
      body: JSON.stringify({msg: "You've signed up to the mailing list!", detail: data})
    };
    
  }
  catch(err){
    console.log(err);
    return { 
      statusCode: 500, 
      body: JSON.stringify({ msg: err.message }),
    };
  }
  
}

