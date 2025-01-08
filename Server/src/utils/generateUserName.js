const generateUserName = (name) => {
  const sanitizedName = name.replace(/\s+/g, "").replace(/[0-9]/g, "");
  const randomNum = Math.floor(1000 + Math.random() * 9000);

  return `${sanitizedName}${randomNum}`.toLowerCase();
};

export default generateUserName;
