package server

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class ProviderController {

    static responseFormats = ['json']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Provider.list(params), model:[providerCount: Provider.count()]
    }

    def show(Provider provider) {
        respond provider
    }

    @Transactional
    def save(Provider provider) {
        if (provider == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (provider.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond provider.errors, view:'create'
            return
        }

        provider.save flush:true

        respond provider, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Provider provider) {
        if (provider == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (provider.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond provider.errors, view:'edit'
            return
        }

        provider.save flush:true

        respond provider, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Provider provider) {

        if (provider == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        provider.delete flush:true

        render status: NO_CONTENT
    }
}
