package server

class PurchasesDetail {
    static mapping = {
         table 'PurchasesDetail'       
         version false
         id generator:'identity', column:'purDetailId'    // assigned que yo los asigno 
         purId column: 'purId'
         productId column: 'productId'
         dynamicUpdate true
         dynamicInsert true
         sort 'purDetailId'         
    } 
    
        Integer count 
        String salesPrice
        String cost
        Purchases purId
        Products productId
    
    static belongsTo=[Purchases, Products]
 
    static constraints={
        count(nullable: false)   
        salesPrice(nullable: true, size: 0..100)
        cost(nullable: true , size: 0..100)
    }
    
    String toString() {
        return "${purDetailId}" 
    }
}