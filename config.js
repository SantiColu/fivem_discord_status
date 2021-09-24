require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.FIVEM_SERVER_PORT || 30120,
  ip: process.env.FIVEM_SERVER_IP,
  botToken: process.env.DISCORD_BOT_TOKEN,
  botPrefix: process.env.DISCORD_BOT_PREFIX || '.',
  TimeBetweenHeartbeats: process.env.TIME_BETWEEN_HEARTBEATS,
  TimeZone: process.env.TIME_ZONE,
  onImage: process.env.ON_IMAGE,
  onMessage: process.env.ON_MESSAGE,
  offImage: process.env.OFF_IMAGE,
  offMessage: process.env.OFF_MESSAGE,
  maintenanceImage: process.env.MAINTENANCE_IMAGE,
  maintenanceMessage: process.env.MAINTENANCE_MESSAGE,
  errorWebhook: process.env.ERROR_WEBHOOK,
  logsWebhook: process.env.LOGS_WEBHOOK
};

module.exports = { config };