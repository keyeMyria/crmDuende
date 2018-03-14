package server

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = false)
class ProductsByCategoryController {

    static responseFormats = ['json']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond ProductsByCategory.list(params), model:[productsByCategoryCount: ProductsByCategory.count()]
    }

    def show(ProductsByCategory productsByCategory) {
        respond productsByCategory
    }

    @Transactional
    def save(ProductsByCategory productsByCategory) {
        if (productsByCategory == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (productsByCategory.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond productsByCategory.errors, view:'create'
            return
        }

        productsByCategory.save flush:true

        respond productsByCategory, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(ProductsByCategory productsByCategory) {
        if (productsByCategory == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (productsByCategory.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond productsByCategory.errors, view:'edit'
            return
        }

        productsByCategory.save flush:true

        respond productsByCategory, [status: OK, view:"show"]
    }

    @Transactional
    def delete(ProductsByCategory productsByCategory) {

        if (productsByCategory == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        productsByCategory.delete flush:true

        render status: NO_CONTENT
    }
}
