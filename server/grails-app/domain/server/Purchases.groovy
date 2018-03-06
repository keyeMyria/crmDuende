package server

class Purchases {
    static mapping = {
         table 'Purchases'       
         version false
         id generator:'identity', column:'purId'    // assigned que yo los asigno 
         dynamicUpdate true
         dynamicInsert true
         sort 'purId'         
    } 
    
        Date date 
        String documentNumber
        String description
 
    static constraints={
        documentNumber(nullable: false, size: 0..60)   
        description(nullable: true, size: 0..100)
        date(nullable: true)
    }
    
    String toString() {
        return "${purId}" 
    }
}