package server

class Purchases {
    static mapping = {
         table 'Purchases'       
         version false
         id generator:'identity', column:'purId'    // assigned que yo los asigno 
         providerId column: 'providerId'
         dynamicUpdate true
         dynamicInsert true
         sort 'id'         
    } 
    
        Date date 
        String documentNumber
        String description
        Provider providerId 
        
    static belongsTo=[Provider]
    static hasMany=[purchaseDetail: PurchasesDetail]
 
    static constraints={
        documentNumber(nullable: false, size: 0..60)   
        description(nullable: true, size: 0..100)
        date(nullable: true)
    }
    
    String toString() {
        return "${id}" 
    }
}