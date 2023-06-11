const cron = require('node-cron');
const { sendMail } = require('./../controller/sendNotification')
const job = cron.schedule('* * * * *', async () => {
    console.log("running");
    await sendMail();
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