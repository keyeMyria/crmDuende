package server

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class PurchasesByMonthController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond PurchasesByMonth.list(params), model:[purchasesByMonthCount: PurchasesByMonth.count()]
    }

    def show(PurchasesByMonth purchasesByMonth) {
        respond purchasesByMonth
    }

    @Transactional
    def save(PurchasesByMonth purchasesByMonth) {
        if (purchasesByMonth == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (purchasesByMonth.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond purchasesByMonth.errors, view:'create'
            return
        }

        purchasesByMonth.save flush:true

        respond purchasesByMonth, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(PurchasesByMonth purchasesByMonth) {
        if (purchasesByMonth == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (purchasesByMonth.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond purchasesByMonth.errors, view:'edit'
            return
        }

        purchasesByMonth.save flush:true

        respond purchasesByMonth, [status: OK, view:"show"]
    }

    @Transactional
    def delete(PurchasesByMonth purchasesByMonth) {

        if (purchasesByMonth == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        purchasesByMonth.delete flush:true

        render status: NO_CONTENT
    }
}
