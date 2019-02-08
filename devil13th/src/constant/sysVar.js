var REQUEST_URL = {
    COMMON : {
      QUERYSELECT : "/infrastructure/common/querySelectDataSource",
    },
    SYSUSER : {
      QUERY : "/infrastructure/sysUser/query",
      SAVE : "/infrastructure/sysUser/",
      DELETE : "/infrastructure/sysUser/",
      UPDATE : "/infrastructure/sysUser/",
      GET : "/infrastructure/sysUser/",
    },
    SYSDICPUB : {
      QUERY : "/infrastructure/sysDicPub/query",
      SAVE : "/infrastructure/sysDicPub/",
      DELETE : "/infrastructure/sysDicPub/",
      UPDATE : "/infrastructure/sysDicPub/",
      GET : "/infrastructure/sysDicPub/",
      DELETEBATCH : "/infrastructure/sysDicPub/deleteSysDicPubBatch/",
      QUERYDICCLASSIFY : "/infrastructure/sysDicPub/querySysDicPubClassify",
    },
    SYSORG : {
      QUERY : "/infrastructure/sysOrg/queryOrgForSelect"
    },
    NOTE : {
      QUERYNOTELIST: "/note/ModNoteList/query",
      QUERYROOT : "/note/queryRoot",
      QUERYNOTECONTENT : "/note/ModNoteContent/",
      QUERYCHILD : "/note/queryNextNodes"
    },
    //QUERY_ALL : "/SysUser/queryAll",
    //QUERY_ALL : "/infrastructure/sysUser/query",
    //SAVE_USER : "/SysUser/saveSysUser",
    //DELETE_USER: "/SysUser/deleteSysUser",
    //GET_USER:"/SysUser/queryById",
    //UPDATE_USER:"/SysUser/updateSysUser",
    //QUERY_ORG:"/SysUser/queryOrgForSelect",
    //QUERY_ORG:"/infrastructure/sysOrg/queryOrgForSelect",
    UPLOAD_FILE:"/fileUploadSubmit"
}


export{ REQUEST_URL as default};