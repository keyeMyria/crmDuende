package server

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import groovy.sql.Sql


@Transactional(readOnly = false)
class ProductsController {

    static responseFormats = ['json']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]
    
    def dataSource

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Products.list(params), model:[productsCount: Products.count()]
    }

    def show(Products products) {
        def sql = new Sql(dataSource)
        String sqlFilePath = grailsApplication.parentContext.servletContext.getRealPath("/migrations/products_select.sql")
        String sqlString = new File(sqlFilePath).text 
        respond products
    }

    @Transactional
    def save(Products products) {
        def sql = new Sql(dataSource)
        String sqlFilePath = grailsApplication.parentContext.servletContext.getRealPath("/migrations/products_insert.sql")
        String sqlString = new File(sqlFilePath).text
        if (sqlString) {
            sqlString = sqlString.replace(" ?place_name", (products.placeName) ? products.placeName : "")
            sqlString = sqlString.replace(" ?bar_code",(products.barCode) ? products.barCode : "")
            sqlString = sqlString.replace(" ?serial_code", (products.serialCode) ? products.serialCode : "")
            sqlString = sqlString.replace(" ?name", (products.name) ? products.name : "") 
            if (products == null) {
                transactionStatus.setRollbackOnly()
                render status: NOT_FOUND
                return
            }

            if (products.hasErrors()) {
                transactionStatus.setRollbackOnly()
                respond products.errors, view:'create'
                return
            }
        } 

        products.save flush:true

        respond products, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Products products) {
        def sql = new Sql(dataSource)
        String sqlFilePath = grailsApplication.parentContext.servletContext.getRealPath("/migrations/products_update.sql")
        String sqlString = new File(sqlFilePath).text
        if (sqlString) {
             sqlString = sqlString.replace(" ?paramId", products.id.toString())
             
            if (products == null) {
                transactionStatus.setRollbackOnly()
                render status: NOT_FOUND
                return
            }

            if (products.hasErrors()) {
                transactionStatus.setRollbackOnly()
                respond products.errors, view:'edit'
                return
            }
        }

        products.save flush:true

        respond products, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Products products) {
        def sql = new Sql(dataSource)
        String sqlFilePath = grailsApplication.parentContext.servletContext.getRealPath("/migrations/products_delete.sql")
        String sqlString = new File(sqlFilePath).text
        
        if(sqlString) {
            sqlString = sqlString.replace(" ids", products.id.toString())
             
            if (products == null) {
                transactionStatus.setRollbackOnly()
                render status: NOT_FOUND
                return
            }
        } 

        products.delete flush:true

        render status: NO_CONTENT
    }
}
