package server

class Provider {
    static mapping = {
         table 'Provider'       
         version false
         id generator:'identity', column:'providerId'    // assigned que yo los asigno 
         dynamicUpdate true
         dynamicInsert true
         sort 'name'         
    } 
    
        String name 
        String mobile
        String phone
        String address
        String countryCode 
        String location
        String email
        String contactName
 
    
    static constraints={
        name(nullable: false, size: 0..60)   
        email(nullable: true, size: 0..60)
        mobile(nullable: true, size: 0..20)
        phone(nullable: true, size: 0..20)
        location(nullable:true, size: 0..60)
        contactName(nullable:true, size: 0..60)
        address(nullable:true, size: 0..60)
        countryCode(nullable:true, size: 0..10)
        
    }
    
    String toString() {
        return "${name}" 
    }
}