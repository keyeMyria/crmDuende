package server

class Inventory {
    static mapping = {
         table 'Inventory'       
         version false
         id generator:'assigned', column:'storeid'    // assigned que yo los asigno
         dynamicUpdate true
         dynamicInsert true
         sort 'storeid'         
    } 

        String storesname
        String categoryname
        String productname
    
    String toString() {
        return "${storesname}" 
    }
}