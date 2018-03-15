package server

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class BillDetailController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond BillDetail.list(params), model:[billDetailCount: BillDetail.count()]
    }

    def show(BillDetail billDetail) {
        respond billDetail
    }

    @Transactional
    def save(BillDetail billDetail) {
        if (billDetail == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (billDetail.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond billDetail.errors, view:'create'
            return
        }

        billDetail.save flush:true

        respond billDetail, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(BillDetail billDetail) {
        if (billDetail == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (billDetail.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond billDetail.errors, view:'edit'
            return
        }

        billDetail.save flush:true

        respond billDetail, [status: OK, view:"show"]
    }

    @Transactional
    def delete(BillDetail billDetail) {

        if (billDetail == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        billDetail.delete flush:true

        render status: NO_CONTENT
    }
}
