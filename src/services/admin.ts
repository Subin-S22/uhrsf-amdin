import baseAxios from ".";

export const yetToApprove = async () => {
  try {
    const res = await baseAxios.get("/yetToApprove");
    return res;
  } catch (err) {
    throw err;
  }
};

export const membersCount = async () => {
  try {
    const res = await baseAxios.get("/memberEnrolledCount");
    return res;
  } catch (err) {
    throw err;
  }
};

export const getByStatus = async (status: string) => {
  try {
    const res = await baseAxios.get(`/detailsByStatus?status=${status}`);
    return res;
  } catch (err) {
    throw err;
  }
};

export const getYettoApprove = async () => {
  try {
    const res = await baseAxios.get("/yetToApprove");
    return res;
  } catch (err) {
    throw err;
  }
};

export const updateStatus = async (requestBody: {
  uhrsfMemberId: string;
  approvalStatus: string;
}) => {
  try {
    const res = await baseAxios.post("/admin-approval", requestBody);
    return res;
  } catch (err) {
    throw err;
  }
};

export const login = async (requestBody: {
  username: string;
  password: string;
}) => {
  try {
    const res = await baseAxios.post("/admin-signin", requestBody);
    return res;
  } catch (err) {
    throw err;
  }
};

export const referralName = async (referralId: string) => {
  try {
    const res = await baseAxios.get(
      `/return-referred-details?referredId=${referralId}`
    );
    return res;
  } catch (err) {
    throw err;
  }
};

export const branchList = async () => {
  try {
    const res = await baseAxios.get("/branch-list");
    return res;
  } catch (err) {
    throw err;
  }
};

export const viewAllApplication = async () => {
  try {
    const res = await baseAxios.get("/view-all");
    return res;
  } catch (err) {
    throw err;
  }
};

export const memberRegister = async (reqBody) => {
  try {
    const res = await baseAxios.post("/member-register", reqBody);
    return res;
  } catch (err) {
    throw err;
  }
};

export const getMemberDetailsById = async (memberId: string) => {
  try {
    const res = await baseAxios.get(`/member-details?memberId=${memberId}`);
    return res;
  } catch (err) {
    throw err;
  }
};

export const addBranch = async (reqBody) => {
  try {
    const res = await baseAxios.put("/create-branch", reqBody);
    return res;
  } catch (err) {
    throw err;
  }
};
