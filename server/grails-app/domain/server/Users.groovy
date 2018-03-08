package server

class Users {
    static mapping = {
         table 'Users'       
         version false
         id generator:'identity', column:'userId'    // assigned que yo los asigno 
         storeId column: 'storeId'
         dynamicUpdate true
         dynamicInsert true
         sort 'name'         
    } 
    
        String name 
        String lastName 
        String userName
        String email
        String mobile
        String phone 
        String picture
        Stores storeId 
       
    static belogsTo = [Stores]
    static hasMany=[bill: Bill]
    
    static constraints={
        name(nullable: false, size: 0..60)   
        lastName(nullable:true, size: 0..60)
        userName(nullable:true, size: 0..20)
        email(nullable: true, size: 0..60)
        mobile(nullable: true, size: 0..20)
        phone(nullable: true, size: 0..20)
        picture(nullable: true, size: 0..20)
    }
    
    String toString() {
        return "${name}" 
    }
}