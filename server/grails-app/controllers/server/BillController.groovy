package server

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import groovy.sql.Sql

@Transactional(readOnly = false)
class BillController {

    static responseFormats = ['json']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]
    
    def dataSource
    
    def index() {
        respond Bill.list(params), model:[billCount: Bill.count()]
    }

    def show(Bill bill) {
        def sql = new Sql(dataSource)
        String sqlFilePath = grailsApplication.parentContext.servletContext.getRealPath("/migrations/bill_select.sql")
        String sqlString = new File(sqlFilePath).text  
        respond bill
    }

    @Transactional
    def save(Bill bill) {
        def sql = new Sql(dataSource)
        String sqlFilePath = grailsApplication.parentContext.servletContext.getRealPath("/migrations/bill_insert.sql")
        String sqlString = new File(sqlFilePath).text  
        if (sqlString) {
             sqlString = sqlString.replace(" ?date", (bill.date) ? bill.date.toString() : "")
             sqlString = sqlString.replace(" ?num_bill", bill.numBill)
        
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

    @Transactional
    def update(Bill bill) {
        def sql = new Sql(dataSource)
        String sqlFilePath = grailsApplication.parentContext.servletContext.getRealPath("/migrations/bill_update.sql")
        String sqlString = new File(sqlFilePath).text 
        if (sqlString) {
             sqlString = sqlString.replace(" ?paramBillId", bill.id.toString())
        
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
        }

        bill.save flush:true

        respond bill, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Bill bill) {
        def sql = new Sql(dataSource)
        String sqlFilePath = grailsApplication.parentContext.servletContext.getRealPath("/migrations/bill_delete.sql")
        String sqlString = new File(sqlFilePath).text 
        if (sqlString) {
             sqlString = sqlString.replace(" billdetailids", bill.id.toString())
             
            if (bill == null) {
                transactionStatus.setRollbackOnly()
                render status: NOT_FOUND
                return
            }
            
            bill.delete flush:true
            
            render status: NO_CONTENT
        }
    }
}
