package server

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import groovy.sql.Sql

@Transactional(readOnly = false)
class BillController {

    static responseFormats = ['json']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Bill.list(params), model:[billCount: Bill.count()]
    }

    def show(Bill bill) {
        def sql = new Sql(dataSource)
        String sqlFilePath = grailsApplication.parentContext.servletContext.getRealPath("/migrations/bill_select.sql")
        String sqlString = new File(sqlFilePath).text 
        if (sqlString) {
            sqlString = sqlString.replace( "?billid", bill.billId)
            sqlString = sqlString.replace(" ?userid", bill.userId)
            sqlString = sqlString.replace(" ?date", bill.date)
            sqlString = sqlString.replace(" ?num_bill", bill.numBill)
            sqlString = sqlString.replace(" ?clientid", bill.clientId) 
        }
        
        respond bill
    }

    @Transactional
    def save(Bill bill) {
        def sql = new Sql(dataSource)
        String sqlFilePath = grailsApplication.parentContext.servletContext.getRealPath("/migrations/bill_insert.sql")
        String sqlString = new File(sqlFilePath).text 
        if(sqlString) {
              sqlString = sqlString.replace( "?billid", bill.billId)
              sqlString = sqlString.replace(" ?userid", bill.userId)
              sqlString = sqlString.replace(" ?date", bill.date)
              sqlString = sqlString.replace(" ?num_bill", bill.numBill)
              sqlString = sqlString.replace(" ?clientid", bill.clientId)
            if (bill == null) {
                transactionStatus.setRollbackOnly()
                render status: NOT_FOUND
                return
            }

            if (bill.hasErrors()) {
                transactionStatus.setRollbackOnly()
                respond bill.errors, view:'create'
                return
            }
        }

        bill.save flush:true

        respond bill, [status: CREATED, view:"show"]
    }
    // update bill

    @Transactional
    def update(Bill bill) {
        def sql = new Sql(dataSource)
        String sqlFilePath = grailsApplication.parentContext.servletContext.getRealPath("/migrations/bill_update.sql")
        String sqlString = new File(sqlFilePath).text 
        
        // integracion sql 
        if (bill == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (bill.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond bill.errors, view:'edit'
            return
        }

        bill.save flush:true

        respond bill, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Bill bill) {
        def sql = new Sql(dataSource)
        String sqlFilePath = grailsApplication.parentContext.servletContext.getRealPath("/migrations/bill_delete.sql")
        String sqlString = new File(sqlFilePath).text 

        if (bill == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        bill.delete flush:true

        render status: NO_CONTENT
    }
}
