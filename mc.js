



const mailchimp = require('@mailchimp/mailchimp_marketing');

mailchimp.setConfig({
  apiKey: "7833d0810f0c5f1d16f9267e35d8a318-us2",
  server: "us2",
});

const run = async () => {
  const response = await mailchimp.lists.getAllLists();
  console.log(response);
};

run();