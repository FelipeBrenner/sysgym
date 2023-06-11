/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")([
  "@fullcalendar/common",
  "@babel/preset-react",
  "@fullcalendar/common",
  "@fullcalendar/daygrid",
  "@fullcalendar/interaction",
  "@fullcalendar/react",
  "@fullcalendar/list",
  "@fullcalendar/timegrid",
  "@fullcalendar/timeline",
]);

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias["./main.css"] = false;
    return config;
  },
};

module.exports = withTM(nextConfig);
