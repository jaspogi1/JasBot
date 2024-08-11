const axios = require('axios');

module.exports.config = {
    name: "ai",
    version: "1.0.0",
    hasPermission: 0,
    credits: "ai",//api by jerome
    description: "Gpt architecture",
    usePrefix: false,
    commandCategory: "GPT4",
    cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
    try {
        const { messageID, messageReply } = event;
        let prompt = args.join(' ');

        if (messageReply) {
            const repliedMessage = messageReply.body;
            prompt = `${repliedMessage} ${prompt}`;
        }

        if (!prompt) {
            return api.sendMessage('𝗣𝗹𝗲𝗮𝘀𝗲 𝗽𝗿𝗼𝘃𝗶𝗱𝗲 𝗮 𝗽𝗿𝗼𝗺𝗽𝘁 𝘁𝗼 𝗴𝗲𝗻𝗲𝗿𝗮𝘁𝗲 𝗮 𝘁𝗲𝘅𝘁 𝗿𝗲𝘀𝗽𝗼𝗻𝘀𝗲.\n𝗘𝘅𝗮𝗺𝗽𝗹𝗲: 𝗮𝗶 𝘄𝗵𝗮𝘁 𝗶𝘀 𝘄𝗮𝘃𝗲?', event.threadID, messageID);
        }
        api.sendMessage('🕧| 𝙎𝙚𝙖𝙧𝙘𝙝𝙞𝙣𝙜 𝙛𝙤𝙧 𝙖𝙣 𝙖𝙣𝙨𝙬𝙚𝙧 𝙩𝙤 𝙮𝙤𝙪𝙧 𝙦𝙪𝙚𝙨𝙩𝙞𝙤𝙣...', event.threadID);

        // Delay
        await new Promise(resolve => setTimeout(resolve, 2000)); // Adjust the delay time as needed

        const gpt4_api = `https://gpt4withcustommodel.onrender.com/gpt?query=${encodeURIComponent(prompt)}&model=gpt-3.5-turbo-16k-0613`;

        const response = await axios.get(gpt4_api);

        if (response.data && response.data.response) {
            const generatedText = response.data.response;

            // Ai Answer Here
            api.sendMessage(`𝗚𝗣𝗧 3.5 𝗧𝗨𝗥𝗕𝗢 𝗠𝗢𝗗. \n━━━━━━━━━━━━━━━━━━\n${generatedText}\nowner: "https://www.facebook.com/jasrelksks"\ncreated here: "https://jasautobot-pkjr.onrender.com" \n━━━━━━━━━━━━━━━━━━`, event.threadID, messageID);
        } else {
            console.error('API response did not contain expected data:', response.data);
            api.sendMessage(`❌ An error occurred while generating the text response. Please try again later. Response data: ${JSON.stringify(response.data)}`, event.threadID, messageID);
        }
    } catch (error) {
        console.error('Error:', error);
        api.sendMessage(`❌ An error occurred while generating the text response. Please try again later. Error details: ${error.message}`, event.threadID, event.messageID);
    }
};
