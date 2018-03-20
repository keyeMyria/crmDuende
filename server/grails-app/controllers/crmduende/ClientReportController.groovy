package crmduende

import grails.rest.*
import grails.converters.*
import groovy.sql.Sql
import grails.transaction.Transactional


class ClientReportController {
	static responseFormats = ['json', 'xml']
	
        
    @Transactional
    def index() {
    def QueryStr=
   """ SELECT clients.name , clients.email, bill.date, products.id, products.name
	FROM public.clients
	JOIN bill ON bill.clientid=clients.clientid
	JOIN billdetail ON billdetail.billid=bill.billid
	JOIN products ON products.id=billdetail.productid """
        def sql= new Sql(dataSource)
        sql.eachRow(ClientsQueryStr){
            def ClientId = it.client_id
            def name= it.client_name
            def email=it.client_email
            def date = it.bill_date
            def id= it.products_id
            def nameproducts = it.products_name
            def testArray = new String[6]
                testArray[0] = ClientId
                testArray[1] = name
                testArray[2] = email
                testArray[3] = date
                testArray[4] = id
                testArray[5] = nameproducts
                respond testArray
        }
    }
    

}

