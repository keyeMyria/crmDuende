package server

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import groovy.sql.Sql

@Transactional(readOnly = false)
class UsersController {

    static responseFormats = ['json']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"] 
    
    def dataSource
    
    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Users.list(params), model:[usersCount: Users.count()]
    }
    
    // Objeto que retorna el usuario
    
    def show(Users users) {
        def sql = new Sql(dataSource)
        String sqlFilePath = grailsApplication.parentContext.servletContext.getRealPath("/migrations/users_select.sql")
        String sqlString = new File(sqlFilePath).text  
        respond users
    }
    
    @Transactional
    // create users 
    def save(Users users) {
        def sql = new Sql(dataSource)
        String sqlFilePath = grailsApplication.parentContext.servletContext.getRealPath("/migrations/users_insert.sql")
        String sqlString = new File(sqlFilePath).text  
        if(sqlString) {
             sqlString = sqlString.replace(" ?phone", users.phone)
             sqlString = sqlString.replace(" ?user_name", users.userName)
             sqlString = sqlString.replace(" ?mobile", users.mobile)
             sqlString = sqlString.replace(" ?name", users.name)
             sqlString = sqlString.replace(" ?picture", users.picture)
             sqlString = sqlString.replace(" ?last_name", users.lastName)
             sqlString = sqlString.replace(" ?email", users.email)
             
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
        }

        users.save flush:true

        respond users, [status: CREATED, view:"show"]
    }
    // update user 
    
    @Transactional
    def update(Users users) {
        def sql = new Sql(dataSource)
        String sqlFilePath = grailsApplication.parentContext.servletContext.getRealPath("/migrations/users_update.sql")
        String sqlString = new File(sqlFilePath).text  
        if(sqlString) {
            sqlString = sqlString.replace(" ?paramUserId", users.id)
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
        }

        users.save flush:true

        respond users, [status: OK, view:"show"]
    }
    
    // delete user  
    @Transactional
    def delete(Users users) {
        def sql = new Sql(dataSource)
        String sqlFilePath = grailsApplication.parentContext.servletContext.getRealPath("/migrations/users_delete.sql")
        String sqlString = new File(sqlFilePath).text  
         if(sqlString) {
            sqlString = sqlString.replace(" ?delUserid", users.id.toString())
            if (users == null) {
                transactionStatus.setRollbackOnly()
                render status: NOT_FOUND
                return
            }
         }

        users.delete flush:true

        render status: NO_CONTENT
    }
}
