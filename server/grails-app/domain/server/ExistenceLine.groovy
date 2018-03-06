package server

class ExistenceLine {

   static mapping = {
         table 'ExistenceLine'       
         version false
         id generator:'identity', column:'id'    // assigned que yo los asigno  
         storeId column: 'storeId' 
         productId colum: 'productId'
         dynamicUpdate true
         dynamicInsert true
         sort 'id'         
    } 
    
        Integer quantity  
        Stores storeId
        Products productId 
        
    // Esta es la relacion que recibe muchos a muchos (una tabla intermedia)
    static belogsTo = [Stores, Products]
    
    static constraints={
        quantity(nullable: false, size: 0..60)   
    }
    
    String toString() {
        return "${id}" 
    }
}