const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
const plugins = [];

//生产环境去除console.log
if (IS_PROD) {
  plugins.push("transform-remove-console");
}
module.exports = {
  presets: [["@vue/app", { useBuiltIns: "entry" }]],
  plugins: plugins
};
