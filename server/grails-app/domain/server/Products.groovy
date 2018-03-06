package server

class Products{
    static mapping = {
         table 'Products'       
         version false
         id generator:'identity', column:'productId'    // assigned que yo los asigno  
         categoryId column: 'categoryId'
         dynamicUpdate true
         dynamicInsert true
         sort 'name'         
    }    
   
    String name 
    String barCode
    String serialCode
    String placeName
    Category categoryId
    
    
    static belongsTo=[Category]   // depende de o es hijo de categoria   
    
    static constraints={
        name(nullable: false, size: 0..60)   
        barcode(nullable:true, size: 0..15)
        placename(nullable: true, size: 0..50)
        serialcode(nullable: true, size: 0..10)
    }
    
    String toString() {
        return "${name}" 
    }
}
