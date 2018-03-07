package crmduende

import grails.rest.RestfulController
import server.Clients

import grails.converters.*

class ClientController extends RestfulController<Clients> {
	static responseFormats = ['json']
        
        ClientController() {
            super(Clients)
        }
        
    @Override
    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        
        return {
            clientsList : listAllResources(params)
            clientsCount: countResources()
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
