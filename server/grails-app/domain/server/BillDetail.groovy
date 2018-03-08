package server

class BillDetail {

   static mapping = {
         table 'BillDetail'       
         version false
         id generator:'identity', column:'billDetailId'    // assigned que yo los asigno  
         billId column: 'billId'
         productId column: 'productId'
         dynamicUpdate true
         dynamicInsert true
         sort 'billDetailId'         
    } 
    
        String cost 
        Integer count
        String salePrice 
        Bill billId
        Products productId
        
    static belongsTo=[Products, Bill]
      
    static constraints={
        count(nullable:false)
        cost(nullable: true, size: 0..100)   
        salePrice(nullable: true, size: 0..100)    
    }
    
    String toString() {
        return "${billDetailId}" 
    }
}