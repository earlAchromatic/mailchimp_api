

const fetch = require('node-fetch')
const base64 = require('base-64')

// const MC_url = 'https://server.api.mailchimp.com/3.0'
// const MC_API = '7833d0810f0c5f1d16f9267e35d8a318-us2'
// const MC_server = 'us2'
// const LIST_ID = '3e38748fa4'
//const getList = `/lists/${Audience_ID}`

exports.handler = async (event) =>{

  // Only allow POST
  if (event.httpMethod !== 'POST') { 
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const errorGen = msg => {
    return { statusCode: 500, body: msg }; 
  };

  try{
    const {email} = JSON.parse(event.body);

    if(!email){
      return errorGen('Missing Email')
    }

    const subscriber = {
      email_address: email,
      status: 'subscribed'
    }

    const credentials = `any: ${process.env.MC_API}`

    const response = await
    fetch(`https://${MC_SERVER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members/`, {
      method: 'POST',
      headers: { 
        Accept: '*/*', 
        'Content-Type': 'application/json', 
        Authorization: `Basic ${base64.encode(credentials)}`},
        body: JSON.stringify(subscriber)
    });

    const data = await response.JSON();

    if (!response.ok){
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

