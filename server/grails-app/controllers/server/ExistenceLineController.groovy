package server

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import groovy.sql.Sql

@Transactional(readOnly = false)
class ExistenceLineController {

    static responseFormats = ['json']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]
    
    def dataSource

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond ExistenceLine.list(params), model:[existenceLineCount: ExistenceLine.count()]
    }

    def show(ExistenceLine existenceLine) {
        def sql = new Sql(dataSource)
        String sqlFilePath = grailsApplication.parentContext.servletContext.getRealPath("/migrations/existenceline_select.sql")
        String sqlString = new File(sqlFilePath).text
        respond existenceLine
    }

    @Transactional
    def save(ExistenceLine existenceLine) {
        def sql = new Sql(dataSource)
        String sqlFilePath = grailsApplication.parentContext.servletContext.getRealPath("/migrations/existenceline_insert.sql")
        String sqlString = new File(sqlFilePath).text
        if (sqlString) {
            sqlString = sqlString.replace(" ?quantity", (existenceLine.quantity) ? existenceLine.quantity.toString() : "")
            
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
        }

        existenceLine.save flush:true

        respond existenceLine, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(ExistenceLine existenceLine) {
        def sql = new Sql(dataSource)
        String sqlFilePath = grailsApplication.parentContext.servletContext.getRealPath("/migrations/existenceline_update.sql")
        String sqlString = new File(sqlFilePath).text
        
        if(sqlString) {
           sqlString = sqlString.replace(" ?paramId", existenceLine.id.toString())
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
        } 

        existenceLine.save flush:true

        respond existenceLine, [status: OK, view:"show"]
    }

    @Transactional
    def delete(ExistenceLine existenceLine) {
        def sql = new Sql(dataSource)
        String sqlFilePath = grailsApplication.parentContext.servletContext.getRealPath("/migrations/existenceline_delete.sql")
        String sqlString = new File(sqlFilePath).text
        
        if(sqlString) { 
            sqlString = sqlString.replace(" ids", existenceLine.id.toString())
             
            if (existenceLine == null) {
                transactionStatus.setRollbackOnly()
                render status: NOT_FOUND
                return
            }
        } 

        existenceLine.delete flush:true

        render status: NO_CONTENT
    }
}
