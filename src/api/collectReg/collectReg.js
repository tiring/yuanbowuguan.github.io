import axios from "@axios/index.js";

//征集上传
export const saveOrUpdate = data => {
  return axios({
    method: "post",
    url: "/recruit/saveOrUpdate",
    data
  });
};

//获取征集表格数据
export const getCollectData = (page, search) => {
  return axios({
    method: "post",
    url: "/recruit/findAll",
    data: {
      ...page,
      ...search
    }
  });
};

// 删除征集管理数据
export const delCollectData = id => {
  return axios({
    method: "post",
    url: "/recruit/del",
    data: {
      id
    }
  });
};

// 根据id查询征集管理数据
export const getCollectDataById = id => {
  return axios({
    method: "post",
    url: "/recruit/findById",
    data: {
      id
    }
  });
};

// 征集审核
export const auditPassOrNot = (id, result) => {
  return axios({
    method: "post",
    url: "/recruit/examine",
    data: {
      id,
      result
    }
  });
};

//根据id导出表格
export const derivedTable = ids => {
  return axios({
    method: "post",
    url: "/recruit/uploadRecruit",
    data: {
      ids
    }
  });
};

//统计征集管理审核状态的数量
export const statisticsAuditNum = () => {
  return axios({
    method: "post",
    url: "recruit/countCheck"
  });
};

//入馆上传
export const libraryUpdate = data => {
  return axios({
    method: "post",
    url: "/enter/saveOrUpdate",
    data
  });
};

//获取表格数据
export const getEnterMuseumRegData = (page, search) => {
  return axios({
    method: "post",
    url: "/enter/findAll",
    data: {
      ...page,
      ...search
    }
  });
};

//入馆审核
export const EnterMuseumRegAudit = (id, result) => {
  return axios({
    method: "post",
    url: "/enter/examine",
    data: {
      id,
      result
    }
  });
};
