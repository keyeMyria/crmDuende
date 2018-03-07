package server

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class ProductsController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Products.list(params), model:[productsCount: Products.count()]
    }

    def show(Products products) {
        respond products
    }

    @Transactional
    def save(Products products) {
        if (products == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (products.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond products.errors, view:'create'
            return
        }

        products.save flush:true

        respond products, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Products products) {
        if (products == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (products.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond products.errors, view:'edit'
            return
        }

        products.save flush:true

        respond products, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Products products) {

        if (products == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        products.delete flush:true

        render status: NO_CONTENT
    }
}
