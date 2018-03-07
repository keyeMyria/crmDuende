package crmduende

import grails.rest.RestfulController
import server.Category

class CategoryController extends RestfulController<Category> {
	static responseFormats = ['json']
        
        CategoryController() {
            super(Category)
        }
        
    @Override
    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        
        return {
            categoryList : listAllResources(params)
            categoryCount: countResources()
            max         : params.max   
            offset      : params.int("offset") ?: 0
            sort        : params.sort
            order       : params.order 
        }
    }
    
    @Override
    boolean getReadOnly() {
        return true
    }
}