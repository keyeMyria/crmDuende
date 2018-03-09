package server

class PurchasesByMonth {
    static mapping = {
         table 'PurchasesByMonth'       
         version false
         id generator:'assigned', column:'purId'    // assigned que yo los asigno
         dynamicUpdate true
         dynamicInsert true
         sort 'name'         
    } 
    
        Date date 
        String documentNumber
        String description
        String name
    
    String toString() {
        return "${name}" 
    }
}