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
    SYS_DIC_PUB_CLASSIFY : {
      QUERY : "/infrastructure/sysDicPubClassify/query",
      SAVE : "/infrastructure/sysDicPubClassify/",
      DELETE : "/infrastructure/sysDicPubClassify/",
      UPDATE : "/infrastructure/sysDicPubClassify/",
      GET : "/infrastructure/sysDicPubClassify/",
      DELETEBATCH : "/infrastructure/sysDicPubClassify/deleteSysDicPubClassifyBatch/"
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
    REACT_CODEGEN_TEST : {
      QUERY : "/infrastructure/reactCodegenTest/query",
      SAVE : "/infrastructure/reactCodegenTest/",
      DELETE : "/infrastructure/reactCodegenTest/",
      UPDATE : "/infrastructure/reactCodegenTest/",
      GET : "/infrastructure/reactCodegenTest/",
      DELETEBATCH : "/infrastructure/reactCodegenTest/deleteReactCodegenTestBatch/"
    },
    MOD_NOTE_LIST : {
      QUERY : "/note/modNoteList/query",
      SAVE : "/note/modNoteList/",
      DELETE : "/note/modNoteList/",
      UPDATE : "/note/modNoteList/",
      GET : "/note/modNoteList/",
      DELETEBATCH : "/note/modNoteList/deleteModNoteListBatch/",
      QUERYNOTECONTENT : "/note/modNoteList/modNoteContent/",
      SAVEMODNOTECONTENT : "/note/modNoteList/saveModNoteContent/"
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