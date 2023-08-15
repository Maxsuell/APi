

const {Configuration, OpenAIApi} = require('openai');
const configuration = new Configuration({
    organization: "{Key}",
    apiKey: " {Key}",
});
const openai = new OpenAIApi(configuration);
const response =  openai.listEngines();

const qrcode = require('qrcode-terminal');
const { stringify } = require('querystring');

const { Client } = require('whatsapp-web.js');
const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

 client.on('message', async message => {
	 const configuration = new Configuration({
      apiKey: " {Key}",
    });
    const openai = new OpenAIApi(configuration);
    
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: message.body}],
    });
    
    const res = completion.data.choices[0].message;
    console.log(res.content);

    client.sendMessage(message.from, res.content);
	
});


client.initialize();
