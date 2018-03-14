package server

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import groovy.sql.Sql

@Transactional(readOnly = true)
class PurchasesDetailController {

    static responseFormats = ['json']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

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

        purchasesDetail.save flush:true

        respond purchasesDetail, [status: CREATED, view:"show"]
    }

    @Transactional
     
    // pasar todos los parametros 
    def update(PurchasesDetail purchasesDetail) {
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

        purchasesDetail.save flush:true

        respond purchasesDetail, [status: OK, view:"show"]
    }

    @Transactional
    def delete(PurchasesDetail purchasesDetail) {
        // solo el id 
        if (purchasesDetail == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        purchasesDetail.delete flush:true

        render status: NO_CONTENT
    }
}
