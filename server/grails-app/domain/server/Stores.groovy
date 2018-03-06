package server

class Stores {
    static mapping = {
         table 'Stores'       
         version false
         id generator:'identity', column:'storeId'    // assigned que yo los asigno  
         dynamicUpdate true
         dynamicInsert true
         sort 'name'         
    } 
    
        String placeName 
        String name 
        String address
        String phone 
       
    static hasMany = [users: Users, existenceLine: ExistenceLine]
    
    static constraints={
        name(nullable: false, size: 0..60)   
        address(nullable:true, size: 0..15)
        placeName(nullable: true, size: 0..50)
        phone(nullable: true, size: 0..20)
    }
    
    String toString() {
        return "${name}" 
    }
}