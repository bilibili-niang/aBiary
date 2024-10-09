import api from "@/utils/api";
import {useMemberStore} from "@/stores";
// import {useMemberStore} from "@/stores";


// const store = useMemberStore();
/**
 * 通过token获取用户信息
 */
export const loginByLocalToken = async () => {
  console.log("loginByLocalToken");
  const token = uni.getStorageSync("token");
  if (!token) {
    return false;
  }
  await api.loginByToken({
    token
  })
    .then(res => {
      const store = useMemberStore();
      store.setProfile(res.result);
    })
    .catch(e => {
      console.log("e:");
      console.log(e);
    });

};