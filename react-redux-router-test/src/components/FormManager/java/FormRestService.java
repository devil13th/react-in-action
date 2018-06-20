package com.thd.springboot.restfulws.test03;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@RequestMapping(value = "/form")
public interface FormRestService {
	
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	//get url http://127.0.0.1:8888/sbt/form/
	public DataGrid getAllFormList();
	
	
	@RequestMapping(value = "/{currentPage}/{pageSize}", method = RequestMethod.GET)
	//get url http://127.0.0.1:8888/sbt/form/1/2?type=xxx
	public DataGrid getFormList(@PathVariable int currentPage,@PathVariable int pageSize,@RequestParam(value="tp",defaultValue="0")String type);
	
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	//get url http://127.0.0.1:8888/sbt/form/1
    public Form getForm (@PathVariable String id);
	
	@RequestMapping(value = "/deleteForm/{id}", method = RequestMethod.GET)
	//get url http://127.0.0.1:8888/sbt/form/deleteForm/1?type=xx
	public AjaxReturnBean deleteForm(@PathVariable String id);
	
	@RequestMapping(value = "/publishForm/{id}", method = RequestMethod.GET)
	//get url http://127.0.0.1:8888/sbt/form/deleteForm/1?type=xx
	public AjaxReturnBean publishForm(@PathVariable String id);
}
