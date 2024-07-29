const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkhBakF3cGtrRWwwNXpyalB2TU4rSFp1cjNXMitKdGU4Qms1eEMyOFZtRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUCtHajVUd2xVSzZSUVNpYU5JRFpiTmZGZEg4U1V4cWc2NDd2czRBRWpsdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHR2toMnNTZmZoVi9pUi9BZ29aOU5IeEVjMnhuUDJ4QVFqRE5xTFQzMUZ3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXazdPTmxsWXlvQmdXdjRqSkxUY29KNnJaNm9tT3ZEQWJ4bFJtQWZCTWhzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdLQnQweVRFTWppVS95MzlpRjBtN2FvajJqVDZOR0xtdVJmaXdQMjNjMTQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZwandaL0lrK1dab2dSL3BBU3pRc1dnUU1BZzNnc0gwM1IxQ0c4Umd2Mm89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEQ3bTZmbVJGWmM0SXdMaDNqQ2s1SVY2aDVpaGNKUGlHV01mQWxOeG9sYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTG1MUWZ1TmlOakd0RW56UEtDdWRmK3hLUDhOWG1TN3M3dzZ3MWZ4VnN5MD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNDM3dLbGk0Q29QUXAzdHRGejg2cW4yNEFEUHVFZC9LbzhrSWdMR1U4MUt2SnRjRE5yZ2x3UzNZREF1a25TQlVCZzBPSS9BOWFUNTBjMDZSSm5CNENnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTAyLCJhZHZTZWNyZXRLZXkiOiJvK3QyNFVucXRMZmh2Zis0QjFrYTRITlBxSm1kS0ZHYW9FUmNtL0gwSFhjPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ6RmpJeGtPRVFWNlNMWFRZc1BSNkN3IiwicGhvbmVJZCI6IjhlN2RkYThiLTdmMmEtNDRkNC05MGFjLTczYWNiMmVlZWE3MyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJIM0wyYzNKajF1NldrcHZBM0Z6c2ErTEV2Uk09In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0VjZTRXOWZxYWhpME1mV0o1V010L2NlZTJFPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IllGUVFYUFJYIiwibWUiOnsiaWQiOiIyNTQ3MjAyNTQ3OTc6NTlAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xmajRya0VFTk9kbnJVR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IitUVzFGODVsSWdGQmR6Qm1zcFBRQXJTSWdLZWZPb3lEYzJTT0JrS0x5U2M9IiwiYWNjb3VudFNpZ25hdHVyZSI6IktHZk5VTnkrR05peFJUeS9QVG1oL0diYTJMOXpWNzFmeXQrQWdmQXAwdkd5dWtGMUo3M3dWVXBrbGlrM3RXeHZsY0FualZVdHpDcUxncFBrbUVRU0NBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiIzWjFMSlkxeTVLVlhkMjlSUlZRUmQvL0RMdkRYeUM5UGRYeVFpZ29VY0hraU5Va1BIYko5bDRtN2VEaE1iOWQ2V2MzZk5GS1ZWWEpSU0VhK0tvWXpEUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDcyMDI1NDc5Nzo1OUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJmazF0UmZPWlNJQlFYY3dacktUMEFLMGlJQ25uenFNZzNOa2pnWkNpOGtuIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIyMjU3MTIwLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUlFaCJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Ibrahim Adams",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

