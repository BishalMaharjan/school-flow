const ask = async ({ prompt }) => {
  return {
    message: "AI features are not enabled yet.",
    echo: prompt,
  };
};

module.exports = {
  ask,
};
