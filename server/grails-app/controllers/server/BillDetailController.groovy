package server

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import groovy.sql.Sql

@Transactional(readOnly = false)
class BillDetailController {

    static responseFormats = ['json']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond BillDetail.list(params), model:[billDetailCount: BillDetail.count()]
    }

    def show(BillDetail billDetail) {
        def sql = new Sql(dataSource)
        String sqlFilePath = grailsApplication.parentContext.servletContext.getRealPath("/migrations/billdetail_select.sql")
        String sqlString = new File(sqlFilePath).text
        respond billDetail
    }

    @Transactional
    def save(BillDetail billDetail) {
        def sql = new Sql(dataSource)
        String sqlFilePath = grailsApplication.parentContext.servletContext.getRealPath("/migrations/billdetail_insert.sql")
        String sqlString = new File(sqlFilePath).text
         if (sqlString) {
            sqlString = sqlString.replace( "?billdetailid", billDetail.billDetailId)
            sqlString = sqlString.replace(" ?billid", billDetail.billId)
            sqlString = sqlString.replace(" ?cost", billDetail.cost)
            sqlString = sqlString.replace(" ?count", billDetail.count)
            sqlString = sqlString.replace(" ?sale_price", billDetail.salePrice)
            sqlString = sqlString.replace(" ?productid", billDetail.productId)
        
            if (billDetail == null) {
                transactionStatus.setRollbackOnly()
                render status: NOT_FOUND
                return
            }

            if (billDetail.hasErrors()) {
                transactionStatus.setRollbackOnly()
                respond billDetail.errors, view:'create'
                return
            }
        }

        billDetail.save flush:true

        respond billDetail, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(BillDetail billDetail) {
        def sql = new Sql(dataSource)
        String sqlFilePath = grailsApplication.parentContext.servletContext.getRealPath("/migrations/billdetail_update.sql")
        String sqlString = new File(sqlFilePath).text
        // agregar extension sql 
        if (billDetail == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (billDetail.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond billDetail.errors, view:'edit'
            return
        }

        billDetail.save flush:true

        respond billDetail, [status: OK, view:"show"]
    }

    @Transactional
    def delete(BillDetail billDetail) {
        def sql = new Sql(dataSource)
        String sqlFilePath = grailsApplication.parentContext.servletContext.getRealPath("/migrations/billdetail_delte.sql")
        String sqlString = new File(sqlFilePath).text
        // agregar extension sql 
        if (billDetail == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        billDetail.delete flush:true

        render status: NO_CONTENT
    }
}
