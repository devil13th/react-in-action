package com.thd.springboot.restfulws.test03;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
@RestController
public class FormRestServiceImpl implements FormRestService {
	
	static Map<String,Form> sysFormMap = Collections.synchronizedMap(new HashMap<String,Form>());
	static Map<String,Form> cusFormMap = Collections.synchronizedMap(new HashMap<String,Form>());
	static List<Form> allFormMap = new ArrayList<Form>();
	
	static{
		for(int i = 0 , j = 105 ; i < j ; i++){
			Form f = new Form();
			f.setId("sys_"+i);
			f.setName("name_" + i);
			f.setAuthor("author_" + i);
			f.setCustomTemplate("SYSTEM");
			f.setDescription("description_" + i);
			f.setPublishDate("2017-01-01 07:00:00");
			f.setTitle("title_" + i);
			f.setUpdateDate("2017-01-01 07:00:00");
			FormRestServiceImpl.sysFormMap.put(f.getId(),f);
		}
		
		
		for(int i = 0 , j = 36 ; i < j ; i++){
			Form f = new Form();
			f.setId("cus_"+i);
			f.setName("name_" + i);
			f.setAuthor("author_" + i);
			f.setCustomTemplate("CUSTOM");
			f.setDescription("description_" + i);
			f.setPublishDate("2017-01-01 07:00:00");
			f.setTitle("title_" + i);
			f.setUpdateDate("2017-01-01 07:00:00");
			FormRestServiceImpl.cusFormMap.put(f.getId(),f);
		}
		
		
	}
	
	
	public void combinResult(){
		List result = new ArrayList<Form>(sysFormMap.values());
		result.addAll(new ArrayList<Form>(cusFormMap.values()));
		allFormMap = result;
	};
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public DataGrid getAllFormList(){
		DataGrid dg = new DataGrid();
		combinResult();
		dg.setRows(allFormMap);
		dg.setTotal(allFormMap.size());
		return dg;
	};
	
	public DataGrid getFormList(@PathVariable int currentPage,@PathVariable int pageSize,@RequestParam(value="tp",defaultValue="0")String type) {
		//System.out.println(currentPage);
		//System.out.println(pageSize);
		System.out.println(type);
		
		DataGrid dg = new DataGrid();
		
		List allResult = "SYSTEM".equals(type) ? new ArrayList<Form>(sysFormMap.values()) : new ArrayList<Form>(cusFormMap.values());
		List result = new ArrayList<Form>();
		int start = pageSize *  (currentPage-1) ;
		int end = start + pageSize;
		if(end >= allResult.size()){
			end = allResult.size();
		}
		result = allResult.subList(start, end);
		dg.setRows(result);
		dg.setTotal(allResult.size());
		dg.setPageSize(pageSize);
		dg.setCurrentPage(currentPage);
		System.out.println(dg.getRows());
		return dg;
	
	};
	
	
    public Form getForm (@PathVariable String id){
    	if(sysFormMap.get(String.valueOf(id)) != null){
			return sysFormMap.get(String.valueOf(id));
		}else{
			
			if(cusFormMap.get(String.valueOf(id)) != null){
				return cusFormMap.get(String.valueOf(id));
			}else{
				return null;
			}
			
		}
    };
    
    public AjaxReturnBean deleteForm(@PathVariable String id){
    	AjaxReturnBean arb = new AjaxReturnBean();
    	try{
    		
    		if(sysFormMap.get(String.valueOf(id)) != null){
    			sysFormMap.remove(String.valueOf(id));
    		}else{
    			
    			if(cusFormMap.get(String.valueOf(id)) != null){
    				cusFormMap.remove(String.valueOf(id));
    			}else{
    				throw new Exception("未找到id=" + id + "的表单");    			
    			}
    			
    		}
    		
    		
    		arb.setStatus("SUCCESS");
    	}catch(Exception e){
    		arb.setStatus("FAILURE");
    		arb.setMessage(e.getMessage());
    	}
    	return arb;
    };
    
    public AjaxReturnBean publishForm(@PathVariable String id){
    	AjaxReturnBean arb = new AjaxReturnBean();
    	try{
    		
    		Form f = getForm(id);
    		if(f ==null){
    			throw new Exception("未找到id=" + id + "的表单");    			
    		}else{
    			SimpleDateFormat format0 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"); 
    			f.setPublishDate(format0.format(new Date()));
    			f.setUpdateDate(format0.format(new Date()));
    		}
    		
    		arb.setStatus("SUCCESS");
    	}catch(Exception e){
    		arb.setStatus("FAILURE");
    		arb.setMessage(e.getMessage());
    	}
    	return arb;
    };

}
