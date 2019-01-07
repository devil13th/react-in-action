var REQUEST_URL = {
    //QUERY_ALL : "/SysUser/queryAll",
    QUERY_ALL : "/infrastructure/sysUser/query",
    SAVE_USER : "/SysUser/saveSysUser",
    DELETE_USER: "/SysUser/deleteSysUser",
    GET_USER:"/SysUser/queryById",
    UPDATE_USER:"/SysUser/updateSysUser",
    //QUERY_ORG:"/SysUser/queryOrgForSelect",
    QUERY_ORG:"/infrastructure/sysOrg/queryOrgForSelect",
    UPLOAD_FILE:"/fileUploadSubmit"
  }

  export{ REQUEST_URL as default};