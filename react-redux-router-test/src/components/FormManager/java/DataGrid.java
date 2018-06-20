/** 
 * Class Description:########
 * Date : 2017年4月2日 下午11:46:04
 * Auth : wanglei 
*/  

package com.thd.springboot.restfulws.test03;

import java.util.List;

public class DataGrid {
	//总条目数
	private int total;
	//当前页数
	private int currentPage;
	//每页条目数量
	private int pageSize;
	//数据集合
	private List rows;
	
	public int getTotal() {
		return total;
	}
	public void setTotal(int total) {
		this.total = total;
	}
	public List getRows() {
		return rows;
	}
	public void setRows(List rows) {
		this.rows = rows;
	}
	public int getCurrentPage() {
		return currentPage;
	}
	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}
	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	
	
}
