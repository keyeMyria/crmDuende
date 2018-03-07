package crmduende

import grails.rest.RestfulController
import server.Users

class UsersController extends RestfulController<Users>  {
	static responseFormats = ['json']
        
        UsersController(){
            super(Users)
        }
        
     @Override
     def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)

        return [
                usersList : listAllResources(params), 
                usersCount: countResources(),     
                max         : params.max,        
                offset      : params.int("offset") ?: 0, 
                sort        : params.sort,  
                order       : params.order  
        ]
    }
    
    @Override
    boolean getReadOnly() {
        return true
    }
}