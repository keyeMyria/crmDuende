package server

class Clients {
    static mapping = {
         table 'Clients'       
         version false
         id generator:'identity', column:'clientId'    // assigned que yo los asigno 
         dynamicUpdate true
         dynamicInsert true
         sort 'name'         
    } 
    
        String name 
        String lastName 
        String userName
        Date birthdayDate 
        Date firstBuy 
        Date lastBuy 
        String email
        String mobile
        String phone
        String address
        String countryCode 
        String location
        String placeName
        String picture
 
    
    static constraints={
        name(nullable: false, size: 0..60)   
        lastName(nullable:true, size: 0..60)
        userName(nullable:false, size: 0..20)
        email(nullable: false, size: 0..60)
        mobile(nullable: true, size: 0..20)
        phone(nullable: true, size: 0..20)
        picture(nullable: true, size: 0..20)
        birthdayDate(nullable: true)
        firstBuy(nullable: true) 
        lastBuy(nullable: true)
        countryCode(nullable:true, size: 0..10)
        location(nullable:true, size: 0..60)
        placeName(nullable:true, size: 0..60)
        address(nullable:true, size: 0..60)
        
    }
    
    String toString() {
        return "${name}" 
    }
}