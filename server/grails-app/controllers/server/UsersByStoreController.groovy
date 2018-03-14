package server

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = false)
class UsersByStoreController {

    static responseFormats = ['json']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond UsersByStore.list(params), model:[usersByStoreCount: UsersByStore.count()]
    }

    def show(UsersByStore usersByStore) {
        respond usersByStore
    }

    @Transactional
    def save(UsersByStore usersByStore) {
        if (usersByStore == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (usersByStore.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond usersByStore.errors, view:'create'
            return
        }

        usersByStore.save flush:true

        respond usersByStore, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(UsersByStore usersByStore) {
        if (usersByStore == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (usersByStore.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond usersByStore.errors, view:'edit'
            return
        }

        usersByStore.save flush:true

        respond usersByStore, [status: OK, view:"show"]
    }

    @Transactional
    def delete(UsersByStore usersByStore) {

        if (usersByStore == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        usersByStore.delete flush:true

        render status: NO_CONTENT
    }
}
