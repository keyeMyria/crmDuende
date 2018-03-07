package server

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class PurchasesController {

    static responseFormats = ['json']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Purchases.list(params), model:[purchasesCount: Purchases.count()]
    }

    def show(Purchases purchases) {
        respond purchases
    }

    @Transactional
    def save(Purchases purchases) {
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

        purchases.save flush:true

        respond purchases, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Purchases purchases) {
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

        purchases.save flush:true

        respond purchases, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Purchases purchases) {

        if (purchases == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        purchases.delete flush:true

        render status: NO_CONTENT
    }
}
