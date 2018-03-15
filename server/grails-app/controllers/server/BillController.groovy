package server

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class BillController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Bill.list(params), model:[billCount: Bill.count()]
    }

    def show(Bill bill) {
        respond bill
    }

    @Transactional
    def save(Bill bill) {
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

        bill.save flush:true

        respond bill, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Bill bill) {
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

        if (bill == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        bill.delete flush:true

        render status: NO_CONTENT
    }
}
