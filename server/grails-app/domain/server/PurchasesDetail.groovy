package server

class PurchasesDetail {
    static mapping = {
         table 'PurchasesDetail'       
         version false
         id generator:'identity', column:'purDetailId'    // assigned que yo los asigno 
         dynamicUpdate true
         dynamicInsert true
         sort 'purDetailId'         
    } 
    
        Integer count 
        String salesPrice
        String cost 
 
    static constraints={
        count(nullable: false)   
        salesPrice(nullable: true, size: 0..100)
        cost(nullable: true , size: 0..100)
    }
    
    String toString() {
        return "${purDetailId}" 
    }
}