package server

class BillDetail {

   static mapping = {
         table 'BillDetail'       
         version false
         id generator:'identity', column:'billDetailId'    // assigned que yo los asigno  
         dynamicUpdate true
         dynamicInsert true
         sort 'billDetailId'         
    } 
    
        String cost 
        Integer count
        String salePrice 
        
  
    static constraints={
        cost(nullable: true, size: 0..100)   
        count(nullable:false)
        salePrice(nullable: true, size: 0..100)
        
    }
    
    String toString() {
        return "${billId}" 
    }
}