const cron = require('node-cron');
const { sendMail } = require('./../controller/sendNotification');
const axios = require('axios');

const job = cron.schedule('* * * * *', async () => {
    console.log("running");
    // let api = "https://google-calendar-backend.vercel.app/api/event/trigger-mail";
    await axios.get('http://localhost:8000/api/event/trigger-mail')
})

module.exports = {
    startTask: (taskName) => {
        if (taskName === "start") {
            job.start();
        }
        return true;
    },

    stopTask: (taskName) => {
        if (taskName === "stop") {
            job.stop();
        }
        return true;
    },
    destroyTask: (taskName) => {
        if (taskName === "destroy") {
            job.destroy();
        }
        return true;
    },
}