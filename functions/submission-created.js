

const fetch = require('node-fetch')
const mailchimp = require('@mailchimp/mailchimp_marketing');


const MC_url = 'https://server.api.mailchimp.com/3.0'

const MC_API = '7833d0810f0c5f1d16f9267e35d8a318-us2'
const MC_server = 'us2'
const Audience_ID = '3e38748fa4'

//const getList = `/lists/${Audience_ID}`

exports.handler = async (event) =>{

  // Only allow POST
  if (event.httpMethod !== 'POST') { 
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  
  mailchimp.setConfig({
    apiKey: MC_API,
    server: MC_server,
  });


  const run = async () => {
    try{
      const response = await client.lists.getList(Audience_ID);
      console.log(response);
      return { statusCode: 200, body: response.body };
    }catch(err){
      return { statusCode: 400, body: err.body };
    }
    
  };
  
  run()


}

