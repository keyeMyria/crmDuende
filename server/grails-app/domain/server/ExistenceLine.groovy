package server

class ExistenceLine {

   static mapping = {
         table 'ExistenceLine'       
         version false
         id generator:'identity', column:'id'    // assigned que yo los asigno  
         storeId column: 'storeId' 
         dynamicUpdate true
         dynamicInsert true
         sort 'id'         
    } 
    
        Integer quantity  
        Stores storeId
        Products productId 
        
    // Esta es la relacion que recibe muchos a muchos (una tabla intermedia)
    static belogsTo = [Stores]
    static hasMany=[products: Products]    //Muchos a muchos 
    
    static constraints={
        quantity(nullable: false, size: 0..60)   
    }
    
    String toString() {
        return "${id}" 
    }
}