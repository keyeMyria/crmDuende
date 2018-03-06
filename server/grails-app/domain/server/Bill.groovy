package server

class Bill {

   static mapping = {
         table 'Bill'       
         version false
         id generator:'identity', column:'billId'    // assigned que yo los asigno  
         dynamicUpdate true
         dynamicInsert true
         sort 'billId'         
    } 
    
        String numBill 
        Date date
        
  
    static constraints={
        numBill(nullable: false, size: 0..100)   
        date(nullable:true)
    }
    
    String toString() {
        return "${billId}" 
    }
}