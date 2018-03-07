package crmduende

import grails.rest.RestfulController
import server.BillDetail

class BillDetailController extends RestfulController<BillDetail> {
	static responseFormats = ['json']
        
        BillDetailController() {
            super(BillDetail)
        }
        
    @Override
    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        
        return {
            billDetail : listAllResources(params)
            billDetailCount: countResources()
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