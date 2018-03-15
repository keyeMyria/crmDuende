package server

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import groovy.sql.Sql

@Transactional(readOnly = false)
class CategoryController {

    static responseFormats = ['json']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Category.list(params), model:[categoryCount: Category.count()]
    }

    def show(Category category) {
        def sql = new Sql(dataSource)
        String sqlFilePath = grailsApplication.parentContext.servletContext.getRealPath("/migrations/category_select.sql")
        String sqlString = new File(sqlFilePath).text
        respond category
    }

    @Transactional
    def save(Category category) {
        def sql = new Sql(dataSource)
        String sqlFilePath = grailsApplication.parentContext.servletContext.getRealPath("/migrations/category_insert.sql")
        String sqlString = new File(sqlFilePath).text
        
        if (sqlString) {
            sqlString = sqlString.replace(" ?name", category.name)
            sqlString = sqlString.replace(" ?description", category.description)
           
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
        }

        category.save flush:true

        respond category, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Category category) {
        def sql = new Sql(dataSource)
        String sqlFilePath = grailsApplication.parentContext.servletContext.getRealPath("/migrations/category_update.sql")
        String sqlString = new File(sqlFilePath).text
        if (sqlString) { 
            sqlString = sqlString.replace(" ?paramCategoryId", category.id.toString())
            
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
        }
        category.save flush:true

        respond category, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Category category) {
        def sql = new Sql(dataSource)
        String sqlFilePath = grailsApplication.parentContext.servletContext.getRealPath("/migrations/category_delete.sql")
        String sqlString = new File(sqlFilePath).text
        
        if (sqlString) {
             sqlString = sqlString.replace(" categoryids", category.id.toString())
             
            if (category == null) {
                transactionStatus.setRollbackOnly()
                render status: NOT_FOUND
                return
            }
        } 

        category.delete flush:true

        render status: NO_CONTENT
    }
}
