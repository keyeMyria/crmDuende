package server

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class UsersController {

    static responseFormats = ['json']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Users.list(params), model:[usersCount: Users.count()]
    }

    def show(Users users) {
        respond users
    }

    @Transactional
    def save(Users users) {
        if (users == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (users.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond users.errors, view:'create'
            return
        }

        users.save flush:true

        respond users, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Users users) {
        if (users == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (users.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond users.errors, view:'edit'
            return
        }

        users.save flush:true

        respond users, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Users users) {

        if (users == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        users.delete flush:true

        render status: NO_CONTENT
    }
}
