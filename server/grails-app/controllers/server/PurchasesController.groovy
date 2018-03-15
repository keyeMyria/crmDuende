package server

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import groovy.sql.Sql

@Transactional(readOnly = false)
class PurchasesController {

    static responseFormats = ['json']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]
    
    def dataSource

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Purchases.list(params), model:[purchasesCount: Purchases.count()]
    }

    def show(Purchases purchases) {
        def sql = new Sql(dataSource)
        String sqlFilePath = grailsApplication.parentContext.servletContext.getRealPath("/migrations/purchases_select.sql")
        String sqlString = new File(sqlFilePath).text
        respond purchases
    }

    @Transactional
    def save(Purchases purchases) {
        def sql = new Sql(dataSource)
        String sqlFilePath = grailsApplication.parentContext.servletContext.getRealPath("/migrations/purchases_insert.sql")
        String sqlString = new File(sqlFilePath).text
        
        if (sqlString) { 
             sqlString = sqlString.replace(" ?date", purchases.date)
             sqlString = sqlString.replace(" ?document_number", purchases.documentNumber)
             sqlString = sqlString.replace(" ?description", purchases.description)
        
            if (purchases == null) {
                transactionStatus.setRollbackOnly()
                render status: NOT_FOUND
                return
            }

            if (purchases.hasErrors()) {
                transactionStatus.setRollbackOnly()
                respond purchases.errors, view:'create'
                return
            }
        }

        purchases.save flush:true

        respond purchases, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Purchases purchases) {
        def sql = new Sql(dataSource)
        String sqlFilePath = grailsApplication.parentContext.servletContext.getRealPath("/migrations/purchases_update.sql")
        String sqlString = new File(sqlFilePath).text
        if (sqlString) {
            sqlString = sqlString.replace(" ?paramPurId", purchases.id.toString())
            
            if (purchases == null) {
                transactionStatus.setRollbackOnly()
                render status: NOT_FOUND
                return
            }

            if (purchases.hasErrors()) {
                transactionStatus.setRollbackOnly()
                respond purchases.errors, view:'edit'
                return
            }
        } 

        purchases.save flush:true

        respond purchases, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Purchases purchases) {
        def sql = new Sql(dataSource)
        String sqlFilePath = grailsApplication.parentContext.servletContext.getRealPath("/migrations/purchases_delete.sql")
        String sqlString = new File(sqlFilePath).text
        if (sqlString) {
            sqlString = sqlString.replace(" purids", purchases.id.toString())

            if (purchases == null) {
                transactionStatus.setRollbackOnly()
                render status: NOT_FOUND
                return
            }
        } 

        purchases.delete flush:true

        render status: NO_CONTENT
    }
}
