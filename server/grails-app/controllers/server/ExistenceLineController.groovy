package server

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class ExistenceLineController {

    static responseFormats = ['json']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond ExistenceLine.list(params), model:[existenceLineCount: ExistenceLine.count()]
    }

    def show(ExistenceLine existenceLine) {
        respond existenceLine
    }

    @Transactional
    def save(ExistenceLine existenceLine) {
        if (existenceLine == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (existenceLine.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond existenceLine.errors, view:'create'
            return
        }

        existenceLine.save flush:true

        respond existenceLine, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(ExistenceLine existenceLine) {
        if (existenceLine == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (existenceLine.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond existenceLine.errors, view:'edit'
            return
        }

        existenceLine.save flush:true

        respond existenceLine, [status: OK, view:"show"]
    }

    @Transactional
    def delete(ExistenceLine existenceLine) {

        if (existenceLine == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        existenceLine.delete flush:true

        render status: NO_CONTENT
    }
}
