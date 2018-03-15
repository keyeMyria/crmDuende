package server

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import groovy.sql.Sql

@Transactional(readOnly = false)
class PurchasesDetailController {

    static responseFormats = ['json']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]
    
    def dataSource

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond PurchasesDetail.list(params), model:[purchasesDetailCount: PurchasesDetail.count()]
    }

    def show(PurchasesDetail purchasesDetail) {
        def sql = new Sql(dataSource)
        String sqlFilePath = grailsApplication.parentContext.servletContext.getRealPath("/migrations/purchasesdetail_select.sql")
        String sqlString = new File(sqlFilePath).text
        respond purchasesDetail
    }

    @Transactional
    def save(PurchasesDetail purchasesDetail) {
        def sql = new Sql(dataSource)
        String sqlFilePath = grailsApplication.parentContext.servletContext.getRealPath("/migrations/purchasesdetail_insert.sql")
        String sqlString = new File(sqlFilePath).text
        if(sqlString) { 
             sqlString = sqlString.replace(" ?cost", purchasesDetail.cost)
             sqlString = sqlString.replace(" ?sales_price", purchasesDetail.salePrice)
             sqlString = sqlString.replace(" ?count", purchasesDetail.placeName.toString())
       
            if (purchasesDetail == null) {
                transactionStatus.setRollbackOnly()
                render status: NOT_FOUND
                return
            }

            if (purchasesDetail.hasErrors()) {
                transactionStatus.setRollbackOnly()
                respond purchasesDetail.errors, view:'create'
                return
            }
        } 

        purchasesDetail.save flush:true

        respond purchasesDetail, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(PurchasesDetail purchasesDetail) {
        def sql = new Sql(dataSource)
        String sqlFilePath = grailsApplication.parentContext.servletContext.getRealPath("/migrations/purchasesdetail_update.sql")
        String sqlString = new File(sqlFilePath).text
        if (sqlString) {
             sqlString = sqlString.replace(" ?paramId", purchasesDetail.id.toString())
        
            if (purchasesDetail == null) {
                transactionStatus.setRollbackOnly()
                render status: NOT_FOUND
                return
            }

            if (purchasesDetail.hasErrors()) {
                transactionStatus.setRollbackOnly()
                respond purchasesDetail.errors, view:'edit'
                return
            }
        }
        purchasesDetail.save flush:true

        respond purchasesDetail, [status: OK, view:"show"]
    }

    @Transactional
    def delete(PurchasesDetail purchasesDetail) {
        def sql = new Sql(dataSource)
        String sqlFilePath = grailsApplication.parentContext.servletContext.getRealPath("/migrations/purchasesdetail_delete.sql")
        String sqlString = new File(sqlFilePath).text
        if(sqlString) { 
            sqlString = sqlString.replace(" purchasesdetailids", purchasesDetail.id.toString())
            if (purchasesDetail == null) {
                transactionStatus.setRollbackOnly()
                render status: NOT_FOUND
                return
            }
        } 

        purchasesDetail.delete flush:true

        render status: NO_CONTENT
    }
}
