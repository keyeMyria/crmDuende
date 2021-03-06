package server

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import groovy.sql.Sql

@Transactional(readOnly = false)
class ClientsController {

    static responseFormats = ['json']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]
    
    def dataSource

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Clients.list(params), model:[clientsCount: Clients.count()]
    }

    def show(Clients clients) {
        def sql = new Sql(dataSource)
        String sqlFilePath = grailsApplication.parentContext.servletContext.getRealPath("/migrations/client_select.sql")
        String sqlString = new File(sqlFilePath).text
        respond clients
    }

    @Transactional
    def save(Clients clients) {
        def sql = new Sql(dataSource)
        String sqlFilePath = grailsApplication.parentContext.servletContext.getRealPath("/migrations/client_insert.sql")
        String sqlString = new File(sqlFilePath).text
         if (sqlString) {
            sqlString = sqlString.replace(" ?phone", (clients.phone) ? clients.phone : "")
            sqlString = sqlString.replace(" ?birthday_date", (clients.birthdayDate) ? clients.birthdayDate.toString() : "")
            sqlString = sqlString.replace(" ?place_name",(clients.placeName) ? clients.placeName : "")
            sqlString = sqlString.replace(" ?user_name", (clients.userName) ? clients.userName : "")
            sqlString = sqlString.replace(" ?last_buy", (clients.lastBuy) ? clients.lastBuy.toString() : "")
            sqlString = sqlString.replace(" ?mobile", (clients.mobile) ? clients.mobile : "")
            sqlString = sqlString.replace(" ?address", (clients.address) ? clients.address : "")
            sqlString = sqlString.replace(" ?country_code", (clients.countryCode) ? clients.countryCode : "")
            sqlString = sqlString.replace(" ?first_buy", (clients.firstBuy) ? clients.firstBuy.toString() : "")
            sqlString = sqlString.replace(" ?name",(clients.name) ? clients.name : "")
            sqlString = sqlString.replace(" ?picture", (clients.picture) ? clients.picture : "")
            sqlString = sqlString.replace(" ?last_name", (clients.lastName) ? clients.lastName : "")
            sqlString = sqlString.replace(" ?email",(clients.email) ? clients.email : "")
        
            if (clients == null) {
                transactionStatus.setRollbackOnly()
                render status: NOT_FOUND
                return
            }

            if (clients.hasErrors()) {
                transactionStatus.setRollbackOnly()
                respond clients.errors, view:'create'
                return
            }
        }

        clients.save flush:true
       
       respond clients, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Clients clients) {
        def sql = new Sql(dataSource)
        String sqlFilePath = grailsApplication.parentContext.servletContext.getRealPath("/migrations/client_update.sql")
        String sqlString = new File(sqlFilePath).text
        
        if (sqlString) {
            sqlString = sqlString.replace(" ?paramClientId", clients.id.toString())
            
            if (clients == null) {
                transactionStatus.setRollbackOnly()
                render status: NOT_FOUND
                return
            }

            if (clients.hasErrors()) {
                transactionStatus.setRollbackOnly()
                respond clients.errors, view:'edit'
                return
            }
        } 

        clients.save flush:true

        respond clients, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Clients clients) {
        def sql = new Sql(dataSource)
        String sqlFilePath = grailsApplication.parentContext.servletContext.getRealPath("/migrations/client_delete.sql")
        String sqlString = new File(sqlFilePath).text
        
        if (sqlString) {
            sqlString = sqlString.replace(" clientids", clients.id.toString())
            
            if (clients == null) {
                transactionStatus.setRollbackOnly()
                render status: NOT_FOUND
                return
            }
        } 

        clients.delete flush:true

        render status: NO_CONTENT
    }
}
