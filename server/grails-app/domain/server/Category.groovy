package server

class Category {

   static mapping = {
         table 'Category'       
         version false
         id generator:'identity', column:'categoryId'    // assigned que yo los asigno  
         dynamicUpdate true
         dynamicInsert true
         sort 'name'         
    } 
    
        String name 
        String description 
        
    static hasMany=[products: Products]    // esta categoria tiene muchos prodcutos del tipo producto 
    
    static constraints={
        name(nullable: false, size: 0..60)   
        description(nullable:true, size: 0..100)
    }
    
    String toString() {
        return "${name}" 
    }
}