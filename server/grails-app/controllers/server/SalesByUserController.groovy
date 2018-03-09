package server

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class SalesByUserController {

    static responseFormats = ['json']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond SalesByUser.list(params), model:[salesByUserCount: SalesByUser.count()]
    }

    def show(SalesByUser salesByUser) {
        respond salesByUser
    }

    @Transactional
    def save(SalesByUser salesByUser) {
        if (salesByUser == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (salesByUser.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond salesByUser.errors, view:'create'
            return
        }

        salesByUser.save flush:true

        respond salesByUser, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(SalesByUser salesByUser) {
        if (salesByUser == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (salesByUser.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond salesByUser.errors, view:'edit'
            return
        }

        salesByUser.save flush:true

        respond salesByUser, [status: OK, view:"show"]
    }

    @Transactional
    def delete(SalesByUser salesByUser) {

        if (salesByUser == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        salesByUser.delete flush:true

        render status: NO_CONTENT
    }
}
