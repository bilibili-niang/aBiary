export default {
  verify(obj, requireList) {
    let flag = true;
    let result = [];
    requireList.forEach(item => {
      if (!obj[item]) {
        result.push("缺少" + item + "参数");
        flag = false;
      }
    });
    return {flag, result};
  }
};