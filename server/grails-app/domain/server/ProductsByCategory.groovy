package server

class ProductsByCategory {
    static mapping = {
         table 'ProductsByCategory'       
         version false
         id generator:'assigned', column:'categoryid'    // assigned que yo los asigno
         dynamicUpdate true
         dynamicInsert true
         sort 'categoryname'         
    } 
    
        String categoryname
        String productname
        String bar_code
    
    String toString() {
        return "${categoryname}" 
    }
}