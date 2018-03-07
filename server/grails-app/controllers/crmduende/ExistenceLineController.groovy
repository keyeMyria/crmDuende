package crmduende

import grails.rest.RestfulController
import server.ExistenceLine

class ExistenceLineController extends RestfulController<ExistenceLine> {
	static responseFormats = ['json']
        
        ExistenceLineController() {
            super(ExistenceLine)
        }
        
    @Override
    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        
        return {
            existenceLineList : listAllResources(params)
            existenceLineCount: countResources()
            max               : params.max   
            offset            : params.int("offset") ?: 0
            sort              : params.sort
            order             : params.order 
        }
    }
    
    @Override
    boolean getReadOnly() {
        return true
    }
}