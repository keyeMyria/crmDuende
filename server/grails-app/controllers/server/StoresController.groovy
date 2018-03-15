package server

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import groovy.sql.Sql

@Transactional(readOnly = false)
class StoresController {

    static responseFormats = ['json']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Stores.list(params), model:[storesCount: Stores.count()]
    }

    def show(Stores stores) {
        def sql = new Sql(dataSource)
        String sqlFilePath = grailsApplication.parentContext.servletContext.getRealPath("/migrations/stores_select.sql")
        String sqlString = new File(sqlFilePath).text
        respond stores
    }

    @Transactional
    def save(Stores stores) {
        def sql = new Sql(dataSource)
        String sqlFilePath = grailsApplication.parentContext.servletContext.getRealPath("/migrations/stores_insert.sql")
        String sqlString = new File(sqlFilePath).text
        if (sqlString) {
             sqlString = sqlString.replace(" ?phone", stores.phone)
             sqlString = sqlString.replace(" ?address", stores.address)
             sqlString = sqlString.replace(" ?place_name", stores.placeName)
             sqlString = sqlString.replace(" ?name", stores.name)
             
            if (stores == null) {
                transactionStatus.setRollbackOnly()
                render status: NOT_FOUND
                return
            }

            if (stores.hasErrors()) {
                transactionStatus.setRollbackOnly()
                respond stores.errors, view:'create'
                return
            }
        } 

        stores.save flush:true

        respond stores, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Stores stores) {
        def sql = new Sql(dataSource)
        String sqlFilePath = grailsApplication.parentContext.servletContext.getRealPath("/migrations/stores_update.sql")
        String sqlString = new File(sqlFilePath).text
        if(sqlString) { 
             sqlString = sqlString.replace(" ?paramStoreId", stores.id.toString())
            if (stores == null) {
                transactionStatus.setRollbackOnly()
                render status: NOT_FOUND
                return
            }

            if (stores.hasErrors()) {
                transactionStatus.setRollbackOnly()
                respond stores.errors, view:'edit'
                return
            }
        } 

        stores.save flush:true

        respond stores, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Stores stores) {
        def sql = new Sql(dataSource)
        String sqlFilePath = grailsApplication.parentContext.servletContext.getRealPath("/migrations/stores_delete.sql")
        String sqlString = new File(sqlFilePath).text
        if (sqlString) { 
            sqlString = sqlString.replace(" storeids", stores.id.toString())
            
            if (stores == null) {
                transactionStatus.setRollbackOnly()
                render status: NOT_FOUND
                return
            }
        } 

        stores.delete flush:true

        render status: NO_CONTENT
    }
}
