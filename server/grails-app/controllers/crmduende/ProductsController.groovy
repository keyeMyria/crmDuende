package crmduende

import grails.rest.RestfulController
import server.Products

class ProductsController extends RestfulController<Products> {
	static responseFormats = ['json']
        
        ProductsController() {
            super(Products)
        }
        
    @Override
    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        
        return {
            productsList : listAllResources(params)
            productsCount: countResources()
            max          : params.max   
            offset       : params.int("offset") ?: 0
            sort         : params.sort
            order        : params.order 
        }
    }
    
    @Override
    boolean getReadOnly() {
        return true
    }
}