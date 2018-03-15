package server

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import groovy.sql.Sql


@Transactional(readOnly = false)
class ProviderController {

    static responseFormats = ['json']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]
    
    def dataSource

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Provider.list(params), model:[providerCount: Provider.count()]
    }

    def show(Provider provider) {
        def sql = new Sql(dataSource)
        String sqlFilePath = grailsApplication.parentContext.servletContext.getRealPath("/migrations/provider_select.sql")
        String sqlString = new File(sqlFilePath).text
        
        respond provider
    }

    @Transactional
    def save(Provider provider) {
        def sql = new Sql(dataSource)
        String sqlFilePath = grailsApplication.parentContext.servletContext.getRealPath("/migrations/provider_insert.sql")
        String sqlString = new File(sqlFilePath).text
        if (sqlString) { 
             sqlString = sqlString.replace(" ?phone", provider.phone)
             sqlString = sqlString.replace(" ?mobile", provider.mobile)
             sqlString = sqlString.replace(" ?address", provider.address)
             sqlString = sqlString.replace(" ?country_code", provider.countryCode)
             sqlString = sqlString.replace(" ?contact_name", provider.contactName)
             sqlString = sqlString.replace(" ?location", provider.location)
             sqlString = sqlString.replace(" ?name", provider.name)
             sqlString = sqlString.replace(" ?email", provider.email)
        
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
        }

        provider.save flush:true

        respond provider, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Provider provider) {
        def sql = new Sql(dataSource)
        String sqlFilePath = grailsApplication.parentContext.servletContext.getRealPath("/migrations/provider_update.sql")
        String sqlString = new File(sqlFilePath).text
        if (sqlString) {
            sqlString = sqlString.replace(" ?paramProviderId", provider.id.toString())
             
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
        } 

        provider.save flush:true

        respond provider, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Provider provider) {
        def sql = new Sql(dataSource)
        String sqlFilePath = grailsApplication.parentContext.servletContext.getRealPath("/migrations/provider_delete.sql")
        String sqlString = new File(sqlFilePath).text
        
        if (sqlString) {
             sqlString = sqlString.replace(" providerids", provider.id.toString())
             
            if (provider == null) {
                transactionStatus.setRollbackOnly()
                render status: NOT_FOUND
                return
            }
        } 

        provider.delete flush:true

        render status: NO_CONTENT
    }
}
