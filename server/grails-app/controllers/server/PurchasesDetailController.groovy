package server

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class PurchasesDetailController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond PurchasesDetail.list(params), model:[purchasesDetailCount: PurchasesDetail.count()]
    }

    def show(PurchasesDetail purchasesDetail) {
        respond purchasesDetail
    }

    @Transactional
    def save(PurchasesDetail purchasesDetail) {
        if (purchasesDetail == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (purchasesDetail.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond purchasesDetail.errors, view:'create'
            return
        }

        purchasesDetail.save flush:true

        respond purchasesDetail, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(PurchasesDetail purchasesDetail) {
        if (purchasesDetail == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (purchasesDetail.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond purchasesDetail.errors, view:'edit'
            return
        }

        purchasesDetail.save flush:true

        respond purchasesDetail, [status: OK, view:"show"]
    }

    @Transactional
    def delete(PurchasesDetail purchasesDetail) {

        if (purchasesDetail == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        purchasesDetail.delete flush:true

        render status: NO_CONTENT
    }
}
