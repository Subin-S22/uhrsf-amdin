import baseAxios from ".";

export const yetToApprove = async () => {
  try {
    const res = await baseAxios.get("/yetToApprove");
    return res;
  } catch (err) {
    return err;
  }
};

export const membersCount = async () => {
  try {
    const res = await baseAxios.get("/memberEnrolledCount");
    return res;
  } catch (err) {
    return err;
  }
};

export const getByStatus = async (status: string) => {
  try {
    const res = await baseAxios.get(`/detailsByStatus?status=${status}`);
    return res;
  } catch (err) {
    return err;
  }
};
