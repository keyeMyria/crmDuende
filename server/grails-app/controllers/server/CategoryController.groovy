package server

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class CategoryController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Category.list(params), model:[categoryCount: Category.count()]
    }

    def show(Category category) {
        respond category
    }

    @Transactional
    def save(Category category) {
        if (category == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (category.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond category.errors, view:'create'
            return
        }

        category.save flush:true

        respond category, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Category category) {
        if (category == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (category.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond category.errors, view:'edit'
            return
        }

        category.save flush:true

        respond category, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Category category) {

        if (category == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        category.delete flush:true

        render status: NO_CONTENT
    }
}
