package server

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class InventoryController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Inventory.list(params), model:[inventoryCount: Inventory.count()]
    }

    def show(Inventory inventory) {
        respond inventory
    }

    @Transactional
    def save(Inventory inventory) {
        if (inventory == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (inventory.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond inventory.errors, view:'create'
            return
        }

        inventory.save flush:true

        respond inventory, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Inventory inventory) {
        if (inventory == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (inventory.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond inventory.errors, view:'edit'
            return
        }

        inventory.save flush:true

        respond inventory, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Inventory inventory) {

        if (inventory == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        inventory.delete flush:true

        render status: NO_CONTENT
    }
}
