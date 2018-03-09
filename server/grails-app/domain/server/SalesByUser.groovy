package server

class SalesByUser {
    static mapping = {
         table 'SalesByUser'       
         version false
         id generator:'assigned', column:'userid'    // assigned que yo los asigno
         dynamicUpdate true
         dynamicInsert true
         sort 'date'         
    } 
    
        Date date 
        String clientsname
        String usersname
    
    String toString() {
        return "${usersname}" 
    }
}