// generate OTP
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// pending email store
export const pendingUsers = new Map();
