package server

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class ClientsController {

    static responseFormats = ['json']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Clients.list(params), model:[clientsCount: Clients.count()]
    }

    def show(Clients clients) {
        respond clients
    }

    @Transactional
    def save(Clients clients) {
        if (clients == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (clients.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond clients.errors, view:'create'
            return
        }

        clients.save flush:true

        respond clients, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Clients clients) {
        if (clients == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (clients.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond clients.errors, view:'edit'
            return
        }

        clients.save flush:true

        respond clients, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Clients clients) {

        if (clients == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        clients.delete flush:true

        render status: NO_CONTENT
    }
}
