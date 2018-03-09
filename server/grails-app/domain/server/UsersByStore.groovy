package server

class UsersByStore {
    static mapping = {
         table 'UsersByStore'       
         version false
         id generator:'assigned', column:'userid'    // assigned que yo los asigno
         dynamicUpdate true
         dynamicInsert true
         sort 'usersname'         
    } 
    
        String storename
        String usersname
    
    String toString() {
        return "${usersname}" 
    }
}